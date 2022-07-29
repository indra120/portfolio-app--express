const getTimeDistance = (format, duration) => {
  switch (format) {
    case 'year':
      return Math.floor(duration / (1000 * 60 * 60 * 24 * 365))
    case 'month':
      return Math.floor(duration / (1000 * 60 * 60 * 24 * 30))
    case 'week':
      return Math.floor(duration / (1000 * 60 * 60 * 24 * 7))
    case 'day':
      return Math.floor(duration / (1000 * 60 * 60 * 24))
    default:
      return Math.floor(duration / (1000 * 60 * 60 * 24))
  }
}

const getDevTime = (startDate, endDate) => {
  let duration = new Date(endDate) - new Date(startDate)

  const distance = {
    year: getTimeDistance('year', duration),
    month: getTimeDistance('month', duration),
    week: getTimeDistance('week', duration),
    day: getTimeDistance('day', duration),
  }

  if (distance.year > 0)
    return `${distance.year} year${distance.year > 1 ? 's' : ''}`

  if (distance.month > 0 && distance.year == 0)
    return `${distance.month} month${distance.month > 1 ? 's' : ''}`

  if (distance.week > 0 && distance.month == 0)
    return `${distance.week} week${distance.week > 1 ? 's' : ''}`

  if (distance.day > 0 && distance.week == 0)
    return `${distance.day} day${distance.day > 1 ? 's' : ''}`
}

module.exports = getDevTime
