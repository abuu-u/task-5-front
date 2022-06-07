const nameKey = 'name'

export const setName = (name: string) => localStorage.setItem(nameKey, name)

export const getName = () => localStorage.getItem(nameKey)

export const removeName = () => localStorage.removeItem(nameKey)
