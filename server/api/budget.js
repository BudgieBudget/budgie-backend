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

// add/update new spending subcategory(ies) and update overall monthly contributions (after validation on front end)
// REQUEST format (stringify subcategories before request):
// {
// 	"category": "utilities",
// 	"subcategories": "[{\"name\": \"Electricity\", \"monthly\": 100}]"
// }
router.put('/:userId/spending/update', async (req, res, next) => {
  const categoryReq = req.body.category
  const subcategoriesReq = JSON.parse(req.body.subcategories)
  try {
    const userId = req.params.userId
    const currentUser = await User.findByPk(userId)
    const currentBudget = await currentUser.getBudget()
    let categoryData = currentBudget.dataValues[categoryReq] // budget data for specified category

    // merge the subcategories if database array empty
    if (categoryData.subcategories.length < 1) {
      categoryData.subcategories = categoryData.subcategories.concat(
        subcategoriesReq
      )
    } else {
      // add to or update the database subcategories
      for (let i = 0; i < subcategoriesReq.length; i++) {
        let subReq = subcategoriesReq[i]
        let subDataIdx = categoryData.subcategories.findIndex(
          sub => sub.name === subReq.name
        )

        if (subDataIdx > -1) {
          categoryData.subcategories[subDataIdx].monthly = subReq.monthly
        } else {
          categoryData.subcategories.push(subReq)
        }
      }
    }

    // add up category's overall monthly amount
    categoryData.overallMonthly = categoryData.subcategories.reduce(
      (sum, sub) => {
        return sum + sub.monthly
      },
      0
    )

    res.json(currentBudget)
  } catch (error) {
    next(error)
  }
})
