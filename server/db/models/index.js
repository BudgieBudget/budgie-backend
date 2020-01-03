const User = require('./user')
const Budget = require('./budget')

User.hasOne(Budget)
Budget.belongsTo(User)

module.exports = {
  User,
  Budget
}
