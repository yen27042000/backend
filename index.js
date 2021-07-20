require('dotenv').config();
const express=require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const routes = require("./router/post") 
const connectDB=async()=>{
    try
    {
        await mongoose.connect(`mongodb+srv://dangvanyen:12345@test1.iwctq.mongodb.net/test1?retryWrites=true&w=majority`, 
       {                        
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:false
       } )
       console.log('thành công');
    }catch(error)
    {
       console.log(error);
       process.exit(1);
    }
}
connectDB();

const app=express();
app.use(express.json());
app.use(cors())
app.use("/api", routes)
app.get('/',(req,res)=> res.send('helel'));
const PORT =5000;

app.listen(PORT,()=>console.log(`sever started on port ${PORT}`)) 