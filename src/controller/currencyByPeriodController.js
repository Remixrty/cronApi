const { currencyEnum } = require('../contants/currency')
const { getDataByParams } = require('../getters/getDataByParams')
const { parserByPeriod } = require('../utils/parserByPeriod')
const { checkDates } = require('../utils/checkDate')

const getCurrencyByPeriod = async (req) => {
  const { currency } = req.params
  const { from, to } = req.query

  const _currency = currency.toUpperCase()

  // проверяем, что все нужные параметры существуют в запросе
  if (!currencyEnum.includes(_currency)) {
    throw new Error(`Invalid currency, ${currency}`)
  }

  if (!from || !to) {
    throw new Error('From and to are required')
  }

  if (!checkDates([from, to])) {
    throw new Error('Date is not correct')
  }

  const data = await getDataByParams({ currency: _currency, from, to })

  const splitJsonResponse = parserByPeriod(data.data)

  return {
    currency: _currency,
    dates: splitJsonResponse
  }
}

module.exports = {
  getCurrencyByPeriod
}