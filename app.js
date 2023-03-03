import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
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
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session())
connectPassport()

/* importing routes */
import userRoutes from './routes/userRoutes.js'



app.use("/api/v1", userRoutes)
