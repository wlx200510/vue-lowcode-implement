export const isArray = (v) => {
  return Array.isArray(v)
}

export const isArrayNoneEmpty = (v) => {
  return isArray(v) && v.length
}

export const isString = (v) => {
  return typeof v === 'string'
}

export const isPlainObject = (v) => {
  return Object.prototype.toString.call(v) === '[object Object]'
}
export const isFunction = (v) => {
  return typeof v === 'function'
}

export const isNumber = (v) => {
  return typeof v === 'number' && !isNaN(v)
}

export const isComponentName = (v) => {
  return /^[a-zA-Z_][a-zA-Z0-9_-]*/gi.test(v)
}

export const isPromise = (v) => {
  return (
    isFunction(v) &&
    isFunction(v.resolve) &&
    isFunction(v.reject) &&
    isFunction(v.prototype.then) &&
    isFunction(v.prototype.catch)
  )
}

export const line2Hump = function (strName) {
  return strName.replace(/-(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  })
}

export const hump2line = function (strName) {
  return strName.replace(/([A-Z])/g, '-$1').toLowerCase()
}

export const firstLetterUpper = function (str) {
  if (!str) return ''
  return str[0].toUpperCase() + str.slice(1)
}

export const getPageOptionData = function (config) {
  let result = {}
  Object.keys(config).forEach((key) => {
    if (isArray(config[key])) {
      result[key] = config[key].reduce((origin, data) => {
        origin[data.attr] = data.val
        return origin
      }, {})
    }
  })
  return result
}

export const setPageOptionData = function (data, pageOption) {
  let result = JSON.parse(JSON.stringify(pageOption))
  Object.keys(data).forEach((key) => {
    if (isArray(result[key])) {
      result[key].forEach((item) => {
        if (data[key][item.attr]) {
          item.val = data[key][item.attr]
        }
      })
    }
  })
  return result
}
