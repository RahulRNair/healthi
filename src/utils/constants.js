var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('./config');

export function isLoggedin(){
  
  let token = sessionStorage.getItem('token');
    
    return jwt.verify(token, config.secret, function(err, decoded) 
    {
      
      if(err) 
      {
        return false;
      }
      else
      {
        return true;
      }

    });
    
    if(token == null){
      
      return false;
    }
 
    
}