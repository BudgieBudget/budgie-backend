const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// get a user's current budget
router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const currentUser = await User.findByPk(userId)
    const currentBudget = await currentUser.getBudget()
    res.json(currentBudget)
  } catch (error) {
    next(error)
  }
})

// initialize a budget table for user
router.post('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const currentUser = await User.findByPk(userId)
    const budget = await currentUser.createBudget()
    res.json(budget)
  } catch (err) {
    next(err)
  }
})

// add a new subcategory
// REQUEST format:
// {
// 	"category": "Utilities",
// 	"subcategory": {"name": "Electricity", "monthly": 200}
// }
router.put('/:userId/add', async (req, res, next) => {
  const category = req.body.category
  const subcategory = req.body.subcategory
  try {
    const userId = req.params.userId
    const currentUser = await User.findByPk(userId)
    const currentBudget = await currentUser.getBudget()
    let budgetData = currentBudget.dataValues
    for (let key of Object.keys(budgetData)) {
      if (budgetData[key].name === category) {
        let subcategoriesArray = budgetData[key].subcategories
        subcategoriesArray.push(subcategory)
      }
    }
    res.json(currentBudget)
  } catch (error) {
    next(error)
  }
})
