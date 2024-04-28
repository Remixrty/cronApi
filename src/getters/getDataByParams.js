const axios = require('axios')
require('dotenv').config()

const getDataByParams = async (params) => {
  const BASE_URL = process.env.BASE_API_URL
  try {
    const res = await axios.get(`${BASE_URL}/selected.txt`, { params })

    return res
  } catch (e) {
    throw new Error('Failed to get data from API')
  }
}

module.exports = {
  getDataByParams
}