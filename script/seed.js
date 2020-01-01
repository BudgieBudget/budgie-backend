'use strict'

const db = require('../server/db')
const {User, Budget} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.bulkCreate([
      {
        username: 'codypug',
        email: 'cody@email.com',
        password: '123'
      },
      {
        username: 'murphydog',
        email: 'murphy@email.com',
        password: '123'
      }
    ])
  ])
  const budgets = await Promise.all([
    Budget.bulkCreate([
      {
        userId: 1,
        shopping: {
          name: 'Shopping',
          overallMonthly: 300,
          subcategories: [
            {name: 'Clothing', monthly: 100},
            {name: 'Electronics', monthly: 50},
            {name: 'Home', monthly: 100},
            {name: 'Entertainment', monthly: 50}
          ]
        },
        food: {
          name: 'Food',
          overallMonthly: 200,
          subcategories: []
        },
        utilities: {
          name: 'Utilities',
          overallMonthly: 250,
          subcategories: []
        },
        publicTransit: {
          name: 'Public Transit',
          overallMonthly: 150,
          subcategories: []
        },
        personalTransport: {
          name: 'Personal Transport',
          overallMonthly: 200,
          subcategories: []
        }
        // health: {},
        // mortgage: {},
        // rent: {},
        // salary: {},
        // taxes: {},
        // savings: {},
        // debts: {},
        // investments: {},
        // retirement: {}
      }
    ])
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${budgets.length} budgets`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
