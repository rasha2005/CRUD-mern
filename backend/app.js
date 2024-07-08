const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoute') ;
const adminRouter = require('./routes/adminRoute')
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

mongoose
.connect(process.env.MONGO_URL)
.then(() => console.log("db connected successfully"))
.catch((err) => {
    console.log(err);
})

app.use('/api' , userRouter);
app.use('/api',adminRouter)

app.get('/' , (req,res) => {
    res.send("heyyy this is your backend");
})

app.listen(process.env.PORT , () => {
    console.log(`server is running on http://localhost:${process.env.PORT}`)
})