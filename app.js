import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
import { errorMiddleware } from './middlewares/errorMiddleware.js';
const app = express();
import { connectPassport } from './utils/Provider.js'
export default app;
dotenv.config({
    path: "./config/config.env"
})
/* using middlewares */
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(cookieParser())
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session())
connectPassport()

/*routes */
app.use("/api/v1", userRoutes)


// Using Error Middleware
app.use(errorMiddleware);