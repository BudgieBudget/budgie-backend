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
          overallMonthly: 250,
          subcategories: [
            {name: 'Clothing', monthly: 100},
            {name: 'Electronics', monthly: 50},
            {name: 'Home', monthly: 100}
          ]
        },
        entertainment: {
          name: 'Entertainment',
          overallMonthly: 40,
          subcategories: [
            {name: 'Theater', monthly: 20},
            {name: 'Streaming Services', monthly: 20}
          ]
        },
        food: {
          name: 'Food',
          overallMonthly: 200,
          subcategories: [
            {name: 'Groceries', monthly: 100},
            {name: 'Dining', monthly: 100}
          ]
        },
        utilities: {
          name: 'Utilities',
          overallMonthly: 350,
          subcategories: [
            {name: 'Electricity', monthly: 100},
            {name: 'Water', monthly: 50},
            {name: 'Sewage', monthly: 25},
            {name: 'Gas / Heat', monthly: 75},
            {name: 'Internet', monthly: 50},
            {name: 'Cell Phone', monthly: 50}
          ]
        },
        publicTransit: {
          name: 'Public Transit',
          overallMonthly: 200,
          subcategories: [
            {name: 'Train / Subway', monthly: 100},
            {name: 'Bus', monthly: 100}
          ]
        },
        personalTransport: {
          name: 'Personal Transport',
          overallMonthly: 200,
          subcategories: [
            {name: 'Gas', monthly: 100},
            {name: 'Tolls', monthly: 50},
            {name: 'Maintenance', monthly: 50}
          ]
        },
        health: {
          name: 'Health',
          overallMonthly: 200,
          subcategories: [
            {name: 'Medical', monthly: 100},
            {name: 'Dental', monthly: 100}
          ]
        },
        pet: {
          name: 'Pet',
          overallMonthly: 50,
          subcategories: [
            {name: 'Food', monthly: 30},
            {name: 'Vet', monthly: 20}
          ]
        },
        miscellaneous: {
          name: 'Miscellaneous',
          overallMonthly: 50,
          subcategories: [
            {name: 'Hobby', monthly: 30},
            {name: 'Gym', monthly: 20}
          ]
        },
        mortgage: {
          name: 'Mortgage',
          overallMonthly: 660,
          subcategories: [
            {name: 'House Mortgage 1', monthly: 300, interest: 0.1},
            {name: 'House Mortgage 2', monthly: 300, interest: 0.1}
          ]
        },
        // rent: {},
        salary: {
          name: 'Salary',
          overallMonthly: 5050,
          subcategories: [
            {name: 'Primary Income', monthly: 5000},
            {name: 'Annual Bonus', monthly: 50}
          ]
        },
        taxes: {
          name: 'Taxes',
          overallMonthly: 2000,
          subcategories: [
            {name: 'New York', monthly: 800},
            {name: 'Federal', monthly: 1200}
          ]
        },
        savings: {
          name: 'Savings',
          overallMonthly: 660,
          subcategories: [
            {name: 'Primary Savings', monthly: 300, APY: 0.1},
            {name: 'Emergency', monthly: 300, APY: 0.1}
          ]
        },
        debts: {
          name: 'Debts',
          overallMonthly: 660,
          subcategories: [
            {name: 'House Loan', monthly: 300, interest: 0.1},
            {name: 'Student Loan', monthly: 300, interest: 0.1}
          ]
        },
        investments: {
          name: 'Investments',
          overallMonthly: 660,
          subcategories: [
            {name: 'eTrade', monthly: 300, interest: 0.1},
            {name: 'Vanguard', monthly: 300, interest: 0.1}
          ]
        },
        retirement: {
          name: 'Retirement',
          overallMonthly: 660,
          subcategories: [
            {name: '401k', monthly: 300, interest: 0.1},
            {name: 'IRA', monthly: 300, interest: 0.1}
          ]
        }
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
