import { isPlainObject, isString, isComponentName } from '@/utils/tool'

const isRequired = (v) => !!v
const isBoolean = (v) => typeof v === 'boolean'

/**
 *
 * @param {string}  name
 * @param {string}  key
 * @param {string}  icon
 * @param {string}  text
 * @param {string}  category
 * @param {object}  condition
 */
export function isValid(conf = {}) {
  //
  const checkPropertyList = [
    { key: 'name', check: [isRequired, isString, isComponentName] },
    { key: 'key', check: [isRequired, isString] },
    { key: 'icon', check: isString },
    { key: 'text', check: isString },
    { key: 'category', check: isString },
    { key: 'condition', check: isPlainObject },
  ]

  return checkPropertyList.every((item) => {
    const prop = item.key
    const func = item.check
    const value = conf[prop]

    const result = Array.isArray(func)
      ? func.every((fn) => fn(value))
      : func(value)

    if (!result) {
      console.warn(
        `[kit config] ${conf._fileName} property 【${prop}】 is invalid: 【${value}】`
      )
    }

    return result
  })
}

export function autoCompletion(conf = {}) {
  const { name, key, icon, text, category, condition } = conf

  if (!isString(name)) {
    conf.name = ''
  }

  if (!isString(key)) {
    conf.key = ''
  }

  if (!isString(icon)) {
    conf.icon = ''
  }

  if (!text) {
    conf.text = ''
  }

  if (!isString(category)) {
    conf.category = ''
  }

  if (!isPlainObject(condition)) {
    conf.condition = {}
  }

  return conf
}
