/**
 * Get a number as a percentage (0 - 1) between two other numbers
 * @param {number} start
 * @param {number} end
 * @param {number} current
 */
export const getPercent = (start, end, current) =>
  (current - start) / (end - start)

/**
 * Get what to display for a date in a list of dates
 * For the first date in a new year, display the year.
 * For the first date in a new month, display the month.
 * Otherwise, display nothing
 * @param {Date[]} dates
 * @param {Date} date
 */
export const getDateDisplay = (dates, date) => {
  const i = dates.findIndex((d) => d === date)

  // If this is the first date, we should show the year
  if (i === 0) {
    return getDateDisplay.YEAR
  }

  // If the previous year is different, we should show this year
  if (dates[i - 1].getFullYear() !== dates[i].getFullYear()) {
    return getDateDisplay.YEAR
  }

  // If the previous month is different, we should show this month
  if (dates[i - 1].getMonth() !== dates[i].getMonth()) {
    return getDateDisplay.MONTH
  }

  return getDateDisplay.NONE
}

getDateDisplay.MONTH = 'MONTH'
getDateDisplay.NONE = 'NONE'
getDateDisplay.YEAR = 'YEAR'
