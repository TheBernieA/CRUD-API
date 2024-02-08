import express, { NextFunction, Request, Response } from "express"
import { router as productRouters } from './routes/users-routes'
import { router as authRouters } from "./routes/auth-routes"
import { HttpError } from "./models/http-error"
import multer, { FileFilterCallback } from 'multer'

const app = express()
app.use(express.json())

app.use((req, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*')
    next();
})

const fileStorage = multer.diskStorage({
    destination: (req: Request, file, cb: any) => {
        cb(null, 'images')//WHERE DO WE WANT TO SAVE THIS FILE
    },
    filename: (req, file, cb) => {
        cb(null, ` ${file.filename}-${file.originalname}`)//USE new Date() or randomUUID() or bothy to fix filenameError
    }
})

const fileFilter = (req: Request, file: any, cb: FileFilterCallback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'))//IMAGE IN SINGLE IS THE NAME WE GAVE OUR INTERFACE


app.use('/api/users', productRouters)

app.use('/api/auth', authRouters)

app.use(() => {
    throw new HttpError('Could not find route', 404)
})

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(error)
    } else {
        res.status(error.code || 500)
        res.json({ message: error.message || 'unknown error occured' })
    }
})

const PORT = 3001

app.listen(PORT, () => {
    console.log('Server running on Port', PORT);
})