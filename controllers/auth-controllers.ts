import { PrismaClient } from "@prisma/client";
import { Response, Request, NextFunction } from "express";
import * as bycrpt from 'bcrypt'
import { HttpError } from "../models/http-error";
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const { SECRET = '' } = process.env

const signup = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body
    const salt = await bycrpt.genSalt()
    const hashedPassword = await bycrpt.hash(password, salt)

    const createdUser = await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword,
        }
    })
    res.json(createdUser)
}


const login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body
    const user = await prisma.user.findFirst({
        where: {
            username: username
        }
    })

    if (user && (await bycrpt.compare(password, user.password))) {
        const payload = { username }
        const accessToken = await jwt.sign(payload, SECRET)
        user.token = accessToken
        return res.json({ user, message: 'user logged' })
    } else {
        return next(new HttpError('Unauthorized Exception', 401))
    }
}


const logout = async (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user
    const userLogout = await prisma.user.update({
        where: {
            id: user?.id
        },
        data: {
            token: null
        }
    }
    )

    res.json({ message: 'logout successful', userLogout })
}

export { signup, login, logout }