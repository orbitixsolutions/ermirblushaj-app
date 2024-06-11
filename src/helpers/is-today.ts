export const isCurrentDate = (date: string) => {
  const dateFormatted = date.replaceAll(/[/]/g, '-')
  
  const current = new Date()
  const target = new Date(dateFormatted)

  // Crear fechas para mañana y pasado mañana
  const tomorrow = new Date()
  tomorrow.setDate(current.getDate() + 1)

  const afterTomorrow = new Date()
  afterTomorrow.setDate(current.getDate() + 2)

  // Formatear las fechas para compararlas
  const formatDate = (date: Date) =>
    `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(
      2,
      '0'
    )}-${String(date.getUTCDate()).padStart(2, '0')}`

  const targetDate = formatDate(target)
  const currentDate = formatDate(current)
  const tomorrowDate = formatDate(tomorrow)
  const dayAfterTomorrowDate = formatDate(afterTomorrow)

  // Verificar si la fecha objetivo es hoy, mañana o pasado mañana
  return (
    targetDate === currentDate ||
    targetDate === tomorrowDate ||
    targetDate === dayAfterTomorrowDate
  )
}
