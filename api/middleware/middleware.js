const users = require('../users/users-model')

function logger(req, res, next) {
 console.log(`${req.method}, ${req.url}, ${new Date}`);
 next()
}

function validateUserId(req, res, next) {
  const id = parseInt(req.params.id)
  if(!id){
    next({ message: "not found", status: 404 })
  }
  users.getById(id)
    .then(user => {
      console.log("hello you")
      if(user){
        req.user = user
        console.log(user)
        next()
      }else{
        next({ message: "user not found", status: 404 })
    }})
    .catch(next({ message: "not found", status: 404 }))
}
     


function validateUser(req, res, next) {
  if ( !req.body.name ){
    next({ message: "missing required name field", status: 404 })
  }else{
    next()
  }
}

function validatePost(req, res, next) {
  if(!req.body.text){
    next({ message: "missing required text field", status: 400 })
  }else{
    next()
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
// do not forget to expose these functions to other modules
