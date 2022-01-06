# vue-lowcode-implement

## Project TODO

- [X] 组装页面的预览功能
- [X] preview的C端页面逻辑优化
- [X] 动态功能基本逻辑补充，写plugins的demo
- [X] upload组件支持直接填写url，避免base64导致JSON数据过大
- [] 考虑不同业务模型的数据管理和适配
- [] C端真实页面index.html的动态路由和动态功能的解析逻辑(国际化?)

### 动态功能定义 dynamicFunc
> 如海报分享 规则弹窗 复制文本 分享链接 等功能

其标准流程都是先初始化(传入初始化参数)，然后调用show方法
考虑封装一个通用的功能加载Class，然后所有的动态功能需要实现init和active方法
允许有dom和无dom的形式
在本项目中实现规则弹窗和复制文本的操作，如果插件有请求接口的逻辑，也可以放在init中
设想的插件系统接受的参数：
- 插件的名称
- 插件的路径
- 插件初始化参数
- 运行环境参数(自定义预留)

### 数据管理和方法的定义
> 考虑到每一种业务都包含特定的数据流，看能否抽象出数据的流向

常见的数据管理模型
- 获取用户登录/cookie信息
- 获取活动信息 / 获取
- 调用接口改变活动/用户状态
- 获取活动记录信息
- 更新页面数据

提出一个数据抽象模型：
1. 每一个数据模型都尽量放在一个store文件中
2. 动态注册store 参考: https://www.jianshu.com/p/7c3536b250f9 
   模块动态注册 https://www.yisu.com/zixun/163251.html

3. 在action中约定公共的init方法和update方法，约定数据获取和更新的逻辑
4. 针对可以在组件中使用的动态数据，直接在组件里面map对应模块的state？
  - 可能要写demo试一试
5. 所有可配置的click事件都用eventHub来代理，Vue2中可以用Vue的实例
  - 跳转页面事件的触发
  - router跳转的触发
  - 针对调用 store 里面 mutation 方法的触发
  - 针对调用 store 里面 action 方法的触发

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
