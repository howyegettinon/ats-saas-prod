export const formatDate = (date: string | Date, includeTime: boolean = true) => {
  const d = new Date(date)
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }
  
  if (includeTime) {
    return d.toLocaleString('en-IE', {
      ...dateOptions,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(',', '') // Removes comma between date and time
  }
  
  return d.toLocaleDateString('en-IE', dateOptions)
}
