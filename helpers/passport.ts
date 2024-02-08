import { PrismaClient } from '@prisma/client'
// import * as dotenv from 'dotenv'
import passport from 'passport'
import passportJWT from 'passport-jwt'

// dotenv.config()
const { SECRET } = process.env
const prisma = new PrismaClient()

passport.use(
    new passportJWT.Strategy({
        secretOrKey: SECRET,
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
        async (payload, done) => {
            const user = await prisma.user.findFirst({
                where: {
                    id: payload.id
                }
            })
            try {
                return user ? done(null, user) : done( new Error('User not found'))
            } catch (error) {
                done(error)
            }

        }

    )
)