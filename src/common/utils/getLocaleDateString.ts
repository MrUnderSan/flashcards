export const getLocaleDateString = (date: Date | string, locales: string = 'ru-RU') => {
  return new Date(date).toLocaleDateString(locales)
}
