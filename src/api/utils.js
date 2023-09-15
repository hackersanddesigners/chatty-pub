const

  toObject = (arr, key) => (
    arr.reduce((res, a) => {
      res[a[key]] = a
      return res
    }, {})
  ),

  sortAlphabetically = (arr, prop) => {
    arr = Array.isArray(arr) ? arr : Object.values(arr)
    return arr.sort((a, b) => {
      const
        aText = prop === 'Name'
          ? a[prop].split(' ')[a[prop].split(' ').length - 1]
          : a[prop],
        bText = prop === 'Name'
          ? b[prop].split(' ')[b[prop].split(' ').length - 1]
          : b[prop]
      return aText.localeCompare(bText)
    })
  },

  sortByUpdate = (arr) => {
    arr = Array.isArray(arr) ? arr : Object.values(arr)
    return arr.sort((a, b) => (
      new Date(b.updated_at) - new Date(a.updated_at)
    ))
  }

export { toObject, sortAlphabetically, sortByUpdate }