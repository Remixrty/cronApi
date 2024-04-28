const axios = require('axios')
require('dotenv').config()

const getDataByDate = async (date) => {
  const BASE_URL = process.env.BASE_API_URL
  try {
    const res = await axios.get(`${BASE_URL}/daily.txt`, { params: { date } })

    return res
  } catch (e) {
    throw new Error('Failed to get data from API')
  }
}

module.exports = {
  getDataByDate
}