const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
var bodyParser = require('body-parser')
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





const listener = app.listen( 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})


let exerciseSchema=new mongoose.Schema({
  description:{type:String,require:true},
  duration:{type:Number,require:true},
  date:String
})

let userSchema=new  mongoose.Schema({
  username:{type:String,require:true},
  log:[exerciseSchema]
})

let Session=mongoose.model('Session',exerciseSchema)
let User=mongoose.model('User',userSchema)

app.post('/api/users',bodyParser.urlencoded({extended:false}),(req,res)=>{
  let newUser=new User({username:req.body.username})
  newUser.save((error,saved)=>{
    if(!error){
      let resObj={};
      resObj['username']=saved.username;
      resObj['_id']=saved.id
      res.json(resObj);
    }
  })
})

app.get('/api/users',(req,res)=>{
  User.find({},(error,arrayOfUsers)=>{
    if(!error){
      res.json(arrayOfUsers);
    }
  })
})

app.post('/api/add',bodyParser.urlencoded({extended:false}),(req,res)=>{
  let newSession=new Session({
    description:req.body.description,
    duration:parseInt(req.body.duration),
    date:req.body.date
  })
  if(newSession.date===''){
    newSession.date=new Date().toISOString().substring(0,10);
}
User.findByIdAndUpdate(
  req.body.userId,
  {$push:{log:newSession}},
  {new:true},
  (error,upadated)=>{
    if(!error){
    let resObj={}
    resObj['_id']=upadated.id,
    resObj['username']=upadated.username,
    resObj['date']=new Date(newSession.date).toDateString()
    resObj['description']=newSession.description,
    resObj['duration']=newSession.duration
    res.json(resObj)
   }
  }
)
})