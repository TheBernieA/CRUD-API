import express from 'express';
import { login, logout, signup } from '../controllers/auth-controllers';
import authorize from '../helpers/authorize';
import '../helpers/passport'

export const router = express.Router()

router.post('/signup', signup)

router.post('/login', login)

router.get('/logout', authorize, logout)