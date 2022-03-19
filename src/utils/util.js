const GET_GUID = (function* () {
  let index = 1

  while (true) {
    yield index
    index += 1
  }
})()

function runLogicParse(str) {
  const regE = /(\w+):\/\/([\w.]+)(\/[^?]+)?(\?[^#]+)?/i
  const result = str.match(regE)
  let protocol, selfHost, search, params
  if (result !== null) {
    protocol = result[1]
    selfHost = result[3] ? result[2] + result[3] : result[2]
    search = result[4]
    params = (function () {
      if (search) {
        var resultObj = {},
          queryString = search.substring(1),
          re = /([^&=]+)=([^&]*)/g,
          m
        while ((m = re.exec(queryString))) {
          resultObj[decodeURIComponent(m[1])] = decodeURIComponent(m[2])
        }
        return resultObj
      }
      return {}
    })()
  }
  //Router Store Plugin
  if (protocol === 'Store') {
    this.$store.dispatch(selfHost, params)
  }
  if (protocol === 'Router') {
    this.$router.push({
      path: '/' + selfHost,
      query: params,
    })
  }
  if (protocol === 'Plugin') {
    this.$$plugins[selfHost].active(params)
  }
}
export default {
  createGUID(prefix = '') {
    const TIME_STAMP = Date.now()
    const Id = GET_GUID.next().value
    return `${prefix}_${TIME_STAMP}_${Id}`
  },
  createDomID(len) {
    return Number(Math.random().toString().substr(3, len)).toString(36)
  },
  copyObj(obj) {
    return JSON.parse(JSON.stringify(obj))
  },
  parseTime(time, cFormat) {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
        time = parseInt(time)
      }
      if (typeof time === 'number' && time.toString().length === 10) {
        console.log('is number')
        time = time * 1000
      }
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay(),
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value]
      }
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return time_str
  },
  parseClickConfig(clickConfig, context) {
    if (!clickConfig) return
    switch (clickConfig.type) {
      case 'outside':
        location.href = clickConfig.href
        break
      case 'logic':
        runLogicParse.call(context, clickConfig.href)
        break
      case 'page':
        document.querySelector('#' + clickConfig.href)?.scrollIntoView()
        break
      case 'code':
        new Function(clickConfig.href).call(context)
        break
    }
  },
}
