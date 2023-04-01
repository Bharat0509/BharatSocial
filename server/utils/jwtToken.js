
const sendToken = (user, statusCode, res) => {

  const token = user.getJWTToken()
  console.log("token is -->",token);
    const options = {
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite:"None",
    secure:true
  }
  user = {...user._doc, token}
  return res.cookie('token', token, options).status(statusCode).json({
    success: true,
   user:user
  })
}

export default sendToken
