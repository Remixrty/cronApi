const parserByDate = (data) => {
  let splitDataString = data.split('\n')
  splitDataString = splitDataString.slice(2, splitDataString.length - 1)

  const responseJson = {}

  splitDataString.forEach((item) => {
    const splitItemString = item.split('|')
    responseJson[splitItemString[0]] = {
      country: splitItemString[1] || '',
      currencyName: splitItemString[3] || '',
      price: splitItemString[4] || ''
    }
  })

  return responseJson
}

module.exports = {
  parserByDate
}