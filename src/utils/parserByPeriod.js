const parserByPeriod = (data) => {
  let splitDataString = data.split('\n')
  splitDataString = splitDataString.slice(2, splitDataString.length - 1)

  const responseJson = {}

  splitDataString.forEach((item) => {
    const splitItemString = item.split('|')
    responseJson[splitItemString[0]] = splitItemString[1]
  })

  return responseJson
}

module.exports = {
  parserByPeriod
}