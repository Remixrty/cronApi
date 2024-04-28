const convertDateFormat = (dateStr) => {
  // Разделяем строку даты на компоненты
  const parts = dateStr.split('.')

  // Переставляем компоненты местами
  return `${parts[1]}.${parts[0]}.${parts[2]}`
}

const checkDates = (dates = []) => {
  if (!dates.length) {
    return false
  }

  for (let i = 0; i < dates.length; i++) {
    const date = convertDateFormat(dates[i])

    if (Number.isNaN(convertDateFormat(date))) {
      return false
    }

    if (i === 0) {
      continue
    }

    if (date < convertDateFormat(dates[i - 1])) {
      return false
    }
  }

  return true
}

module.exports = {
  checkDates
}