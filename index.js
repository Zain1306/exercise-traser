const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose');

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
console.log(conndb());
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
