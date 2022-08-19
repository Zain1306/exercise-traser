const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
var bodyParser = require('body-parser')
const mongoose = require('mongoose');



const route = require('./routers/router');
app.use('/api/users',route);
 const rouute=require('./routers/router2');
 app.use('/api/users/:_id/exercises',rouute)


async function conndb()
{

  try {
    await mongoose.connect(process.env.PORT, {useNewUrlParser: true, useUnifiedTopology: true});
//Get the default connection
var db  = await mongoose.connection;
console.log("Database connected succsefully");
  } catch (error) {
    console.log('MongoDB connection error:'); 
  }

//Bind connection to error event (to get notification of connection errors)
}
conndb();
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});





const listener = app.listen( 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})



let exerciseSessionSchema = new mongoose.Schema({
  description: {type: String, required: true},
  duration: {type: Number, required: true},
  date: String
})

let userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  log: [exerciseSessionSchema]
})

let Session = mongoose.model('Session', exerciseSessionSchema)
let User = mongoose.model('User', userSchema)

