import Express  from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';
import storyroutes from './routes/storyroute.js';
import auth from './routes/auth.js';
import dotenv from 'dotenv'; // Add this line to import dotenv

dotenv.config(); // Add this line to load environment variables from .env file
//latest
import caseroutes from './routes/caseroute.js';

//new
const mongoURL = process.env.MONGODB_URI; // Add this line to get the environment variable
const app = Express();
mongoose.connect(mongoURL,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Mongodb connected")
}).catch((err)=>{
    console.error(err)
});


app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    next();
  }) 
app.use('/api/stories',storyroutes);
app.use('/api/auth',auth);
app.use('/api/cases',caseroutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})
