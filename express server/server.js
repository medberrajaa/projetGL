require("dotenv").config()

const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRoute');
const app = express();
const corsOptions = require("./config/corsOptions"); 
const PORT = process.env.PORT;
const mdb = mongoose.connection;
const { logger } = require('./middleware/logEvents');

app.use(logger);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/',express.static(path.join(__dirname,'/public')));
app.use('/user',userRouter);

mongoose.connect(process.env.MONGODB);
mdb.on('error',(error)=>console.error(error));
mdb.once('open',()=>console.log('connected'));

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

app.listen(PORT,()=>{
    console.log("listen");
});