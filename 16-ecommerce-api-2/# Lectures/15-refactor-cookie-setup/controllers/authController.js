const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors/')
const { attachCookiesToResponse } = require('../utils')

const register = async (req, res) => {
  const { email, name, password } = req.body
  const isEmailExists = await User.findOne({ email })
  if (isEmailExists)
    throw new CustomError.BadRequestError('Email already exists')

  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user'

  const user = await User.create({ name, email, password, role })

  const tokenUser = { name: user.name, userID: user._id, role: user.role }

  attachCookiesToResponse({ res, user: tokenUser }) // 2. app.js

  return res.status(StatusCodes.CREATED).json({ user: tokenUser })
}

const login = async (req, res) => {
  res.send('Login ')
}

const logout = async (req, res) => {
  res.send('Logout')
}

module.exports = {
  register,
  login,
  logout,
}
