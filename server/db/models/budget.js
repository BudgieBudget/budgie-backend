const Sequelize = require('sequelize')
const db = require('../db')

const Budget = db.define('budget', {
  shopping: {
    type: Sequelize.JSON,
    defaultValue: {name: 'Shopping', overallMonthly: 0, subcategories: []}
  },
  food: {
    type: Sequelize.JSON,
    defaultValue: {name: 'Food', overallMonthly: 0, subcategories: []}
  },
  utilities: {
    type: Sequelize.JSON,
    defaultValue: {name: 'Utilities', overallMonthly: 0, subcategories: []}
  },
  publicTransit: {
    type: Sequelize.JSON,
    defaultValue: {name: 'Public Transit', overallMonthly: 0, subcategories: []}
  },
  personalTransport: {
    type: Sequelize.JSON,
    defaultValue: {
      name: 'Personal Transport',
      overallMonthly: 0,
      subcategories: []
    }
  },
  health: {
    type: Sequelize.JSON,
    defaultValue: {name: 'Health', overallMonthly: 0, subcategories: []}
  },
  mortgage: {
    type: Sequelize.JSON,
    defaultValue: {name: 'Mortgage', overallMonthly: 0, subcategories: []}
  },
  rent: {
    type: Sequelize.JSON,
    defaultValue: {name: 'Rent', overallMonthly: 0, subcategories: []}
  },
  salary: {
    type: Sequelize.JSON,
    defaultValue: {name: 'Salary', overallMonthly: 0, subcategories: []}
  },
  taxes: {
    type: Sequelize.JSON,
    defaultValue: {name: 'Taxes', overallMonthly: 0, subcategories: []}
  },
  savings: {
    type: Sequelize.JSON,
    defaultValue: {name: 'Savings', overallMonthly: 0, subcategories: []}
  },
  debts: {
    type: Sequelize.JSON,
    defaultValue: {name: 'Debts', overallMonthly: 0, subcategories: []}
  },
  investments: {
    type: Sequelize.JSON,
    defaultValue: {name: 'Investments', overallMonthly: 0, subcategories: []}
  },
  retirement: {
    type: Sequelize.JSON,
    defaultValue: {name: 'Retirement', overallMonthly: 0, subcategories: []}
  }
})

module.exports = Budget
