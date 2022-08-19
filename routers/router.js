const express = require('express')

var bodyParser = require('body-parser')
let router=express.Router();


router
.route('/api/users')
.post( bodyParser.urlencoded({ extended: false }), (request, response) => {
    let newUser = new User({username: request.body.username})
    newUser.save((error, savedUser) => {
      if(!error){
        let responseObject = {}
        responseObject['username'] = savedUser.username
        responseObject['_id'] = savedUser.id
        response.json(responseObject)
      }
    })
  })
.get( (request, response) => {
    
    User.find({}, (error, arrayOfUsers) => {
      if(!error){
        response.json(arrayOfUsers)
      }
    })
    
  })
  module.exports=router;