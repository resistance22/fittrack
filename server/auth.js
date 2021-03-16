const jwt = require('jsonwebtoken')
function checkJWT (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err)
      }
      resolve(decoded)
    })
  })
}
module.exports = async function (req, res, next) {
  const { authorization } = req.headers
  const token = authorization && authorization.split(' ')[1]
  if (!token) return res.sendStatus(403)
  const user = await checkJWT(token)
  if (!user) return res.sendStatus(403)
  req.user = user
  next()
}
