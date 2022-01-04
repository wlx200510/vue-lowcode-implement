# vue-lowcode-implement

## Project TODO

- [X] 组装页面的预览功能
- [X] preview的C端页面逻辑优化
- [X] 动态功能基本逻辑补充，写plugins的demo
- [X] upload组件支持直接填写url，避免base64导致JSON数据过大
- [] C端真实页面index.html的动态路由和动态功能的解析逻辑
- [] 考虑不同业务模型的数据管理和适配

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
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
