export const formattedDate = ({
  date: date,
  mode: mode
}: {
  date: string
  mode: {
    time: string
  }
}) => {
  const newDate = new Date(date)

  if (mode.time === 'hours') {
    return newDate.toLocaleTimeString('en-EN', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  }

  if (mode.time === 'full-date') {
    return newDate.toLocaleDateString('en-EN', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  }
}
