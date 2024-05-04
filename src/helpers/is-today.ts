export const isCurrentDate = (date: string) => {
    const current = new Date()
    const target = new Date(date!)

    const targetDate = `${target.getUTCFullYear()}-${
      target.getUTCMonth() + 1
    }-${target.getUTCDate()}`

    const currentDate = `${current.getFullYear()}-${
      current.getMonth() + 1
    }-${current.getDate()}`

    return targetDate === currentDate
  }
