import 'dotenv/config';
import express from 'express'
import mongoose from 'mongoose';
import blogRoutes from './routes/blogRoutes.js'
import {errorHandler} from './middlewares/errorMiddleware.js'
const app = express();
const MONGO_URL = 'mongodb+srv://fathizidan52:n8KQLVhvZ5vprLcU@cluster0.lfb3fms.mongodb.net/?retryWrites=true&w=majority'
//Middleware for json
app.use(express.json());

app.use('/blogs',blogRoutes);

app.use(errorHandler);

mongoose.connect(MONGO_URL).then(()=>{
    console.log("MongoDB Connected");
    app.listen(3200,()=>{
        console.log('Server Running on Port 3200');
    })
})