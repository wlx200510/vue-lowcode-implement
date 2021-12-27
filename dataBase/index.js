const context = require.context(`./`, true, /.json$/)
const data = context
  .keys()
  .map((key) => {
    return context(key)
  })
  .sort((item1, item2) => item1.id - item2.id)

export default data
