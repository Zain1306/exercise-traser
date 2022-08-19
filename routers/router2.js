const express = require('express')

var bodyParser = require('body-parser')
let router=express.Router();



router
.route('/api/users/:_id/exercises')
.post(bodyParser.urlencoded({ extended: false }) , (request, response) => {
  
    let newSession = new Session({
      description: request.body.description,
      duration: parseInt(request.body.duration),
      date: request.body.date
    })
    
    if(newSession.date === ''){
      newSession.date = new Date().toISOString().substring(0, 10)
    }
    
    User.findByIdAndUpdate(
      request.body.userId,
      {$push : {log: newSession}},
      {new: true},
      (error, updatedUser)=> {
        if(!error){
          let responseObject = {}
          responseObject['_id'] = updatedUser._id
          responseObject['username'] = updatedUser.username
          responseObject['date'] = new Date(newSession.date).toDateString()
          responseObject['description'] = newSession.description
          responseObject['duration'] = newSession.duration
          response.json(responseObject)
        }
      }
    )
  })
  .get('/api/users/:_id/logs', (request, response) => {
    
    User.findById(request.query.userId, (error, result) => {
      if(!error){
        let responseObject = result
        
        if(request.query.from || request.query.to){
          
          let fromDate = new Date(0)
          let toDate = new Date()
          
          if(request.query.from){
            fromDate = new Date(request.query.from)
          }
          
          if(request.query.to){
            toDate = new Date(request.query.to)
          }
          
          fromDate = fromDate.getTime()
          toDate = toDate.getTime()
          
          responseObject.log = responseObject.log.filter((session) => {
            let sessionDate = new Date(session.date).getTime()
            
            return sessionDate >= fromDate && sessionDate <= toDate
            
          })
          
        }
        
        if(request.query.limit){
          responseObject.log = responseObject.log.slice(0, request.query.limit)
        }
        
        responseObject = responseObject.toJSON()
        responseObject['count'] = result.log.length
        response.json(responseObject)
      }
    })
    
  })
  module.exports=router;