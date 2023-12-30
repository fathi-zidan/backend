import 'dotenv/config';
import express from "express";
import {errorHandler} from './middlewares/errorMiddleware.js'
import usersRoute from './routes/usersRoute.js'
const app = express();

//Middleware for JSON parsing
app.use(express.json());

//Bank Routes
app.use('/users',usersRoute);

//Error handling Middleware
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(3000,()=>{
    console.log(`Server running on 3000`);
})