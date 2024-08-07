const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })

  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    throw new BadRequestError('Please provide email and password')

  // find user
  const user = await User.findOne({ email })
  if (!user) throw new UnauthenticatedError('Invalid Credentials')

  // compare password
  const isPasswordCorrect = await user.comparePassword(password)

  // wrong -> throw error
  if (!isPasswordCorrect) throw new UnauthenticatedError('Invalid Credentials')

  // create new JWT
  const token = user.createJWT()

  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, userID: user._id }, token })
}

module.exports = {
  register,
  login,
}
