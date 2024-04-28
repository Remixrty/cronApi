const { parserByDate } = require('../utils/parserByDate')
const { checkDates } = require('../utils/checkDate')
const { getDataByDate } = require('../getters/getDataByDate')

const getCurrencyByDate = async (req) => {
  const { date } = req.query

  if (date && !checkDates([date])) {
    throw new Error('Date is not correct')
  }

  const data = await getDataByDate(date)

  const splitJsonResponse = parserByDate(data.data)

  return {
    date: date || new Date().toLocaleDateString("ru-RU"),
    currencies: splitJsonResponse
  }
}

module.exports = {
  getCurrencyByDate
}