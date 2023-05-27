const db = require('../../data/db-config')
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
console.log('Middleware CHECK_SCHEME_ID')
const { scheme_id } = req.params
const scheme = await db('schemes').where('scheme_id',scheme_id).first()
if(scheme){
  next()
} else if(!scheme_id){
  res.status(404).json({
  message:`scheme with scheme_id ${scheme_id} not found`

  })
} else {
  res.status(404).json({
    message: "scheme not found"
  
  })
}
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
console.log('Middleware VALIDATE_SCHEME')
const {scheme_name} = req.body
if(!scheme_name ||  typeof scheme_name !== 'string'|| scheme_name.trim() === ''){
 return  res.status(400).json({
    message: "invalid scheme_name"
  })
} next()
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
console.log('Middleware VALIDATE_STEP')
const {step_number, instructions} = req.body
if(!instructions || typeof instructions !== 'string' || instructions.trim()=== '' || step_number < 1){
  return res.status(400).json({
    message: 'invalid step'
  })
} next()

}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
