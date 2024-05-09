export const isLimitDate = (date: string) => {
  const target = new Date(date)
  target.setDate(target.getDate() + 3)

  const newDate = target.toISOString().split('T')[0]

  return newDate
}
