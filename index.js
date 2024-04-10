import express from 'express';
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import route from './routes/userRoute.js';


const app = express();

app.use(bodyParser.json());
app.use(cors());
dotenv.config();
app.use(
  cors({
    origin: "https://showcrud.netlify.app",
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://showcrud.netlify.app"
  );
  res.header(
    "Access-Control-Allow-Origin",
    "Origin,X-Requested-With,Content-Type,Accept",
    "Access-Control-Allow-Methods: GET, DELETE, PUT, PATCH, HEAD, OPTIONS, POST"
  );
  next();
});

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(()=>{
      console.log("databse connected successfully");

      app.listen(PORT,()=>{
            console.log(`server is listening at port ${PORT}`);
      })
}).catch(error => console.log(error));

app.use("/api",route)
