const formatDate = (date: string | Date): string => {
    const newDate = new Date(date)
    const day = newDate.getDate() > 9 ? newDate.getDate() : `0${newDate.getDate()}`
    const month = newDate.getMonth() + 1 > 9 ? newDate.getMonth() + 1 : `0${newDate.getMonth() + 1}`
    const year = newDate.getFullYear()

    return `${day}/${month}/${year}`
}

export default formatDate