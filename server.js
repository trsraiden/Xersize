const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app=express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB database connection established.");
});

//in order to use the db
const usersRouter = require('./routes/users');
const routinesRouter = require('./routes/routines');
const sessionsRouter = require('./routes/sessions');

app.use('/users', usersRouter);
app.use('/routines', routinesRouter);
app.use('/sessions', sessionsRouter);
//in order to use the db

//build and use for production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('xersize-client/build'));
}
app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, 'xersize-client/build', 'index.html'));
});


app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
});