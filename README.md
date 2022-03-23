# vue-lowcode-implement

## Project TODO

- [X] 组装页面的预览功能
- [X] preview的C端页面逻辑优化
- [X] 动态功能基本逻辑补充，写plugins的demo
- [X] upload组件支持直接填写url，避免base64导致JSON数据过大
- [X] 考虑不同业务模型的数据管理和适配
- [X] 组件和预制页面增加业务 projectType 过滤
- [X] clickConfig功能完善化
- [X] click的配置解析函数补充完成
- [X] code input升级为vue-codemirror
- [X] 基本组件的能力补齐 —— 组件已完成
- [X] 重构comp.config.js: 整合进入config.js, 移除无用的assert字段(config.json需要变为js)
- [ ] C端真实页面index.html的动态路由和动态功能的解析逻辑(国际化能力待补充)

## 项目介绍
虽然项目名称上包括了lowcode，不过本项目实际是为了探索一整套的前端页面管理架构，不止是低代码生成JSON然后动态解析为C端页面。其整体思路是把页面的功能和内容都在B端做一个管理，使得页面有一套有较高可视化和较强配置能力的后台，达到研发人员快速熟悉前端业务，简单改动通过配置解决，复杂页面通过写可复用的代码解决 这么一套提效和赋能的工具。

我们先来看看页面是什么

页面是前端的工作产出，也是最终被用户所感知和使用的成品，依赖某些设备来展现。
简单页面可能是配置出来的，复杂交互页面是通过代码开发出来的，有一个共识是配置可实现的，代码一定能实现，反之则需要经过恰当的抽象和配置的流程才能实现。

在对低代码相关方案的调研中，发现很多平台配置页面的功能是非常丰富和完善的，但后果就是这一套系统的上手成本越来越高，而脱离了最早的：拖拖拽拽就能生成页面的初心。 试想一个低代码平台有非常多的流程和交互配置，势必会导致使用的熵越来越高，虽然解放了研发，但本质是把压力转移给了运营和产品培训。

回归到业务上，其实有很多常用的业务内容，或者交互流程，用代码非常方便实现，用配置描述却很绕，并且对开发人员的产品抽象能力要求也越来越高，所以尝试引入了第一个概念：预制页面。在土木工程中这个概念较为常见，比如预制板房，预制楼板，其作用是把高频率需求的内容进行标准化，从而提供工程效率，得以快速完成临时搭建或者建筑建设，疫情中的临时医院(时间要求非常高)，工地的简易板房，无一不是预制件的产物，为人们的生产和生活提供了极大的便利。

### 抽象内容思考

针对某些可复用的功能性页面，我们考虑使用上面提出的预制概念，如 登录页面/明细页面/用户个人信息页面 其特点就是逻辑相对固定，多个产品功能需要复用，但并非产品方的重点关注点，如果工程化和约定没做好就会导致冗余代码的复制和分散的改动。这里的预制页面想的是全部用代码来实现，但暴露出部分可定制的属性，在后台可以简单得实现更改属性可预览，并可以灵活关联到各种业务项目中。

组件的拖拽可配置是老生常谈的话题了，

业务模型往往跟数据模型紧密相关，由此延伸出一个想法，是否可以尝试把每种业务模型都抽象成store的模块，在页面加载时根据配置数据来灵活加载对应业务模块的Store，这样会导致预制页面和配置组件如果用到了特定业务模型的数据，直接通过store引入即可，从而避免了在配置上对字段和接口进行关联，个人认为低代码也不应该暴露太多数据层面的东西，只需要针对预制页面和组件在配置时根据业务类型做一层针对性的过滤即可。

在实际业务开发工作中，通过进一步分析，发现除了展现和数据外，有一些生产和交互的内容，如点击按钮生成并自动分享海报，或者点击按钮触发提现操作并刷新页面，或者就是简单的复制一段文字。针对这些流程，用配置不容易解决，于是引入了插件的概念，这里的插件并不是Vue中轻量级的toast组件，而是针对某一系列不需要用户介入的流程做了封装，实现了约定好的init和active接口，从而保证在页面中得以灵活配置，至于是用字符串code实现还是配置某个约定好的Schema，在本项目中都有涉及，可以尽量做到灵活的选择。

插件在数据层面应该是轻量的，也即不应该有较多频繁的交互，尽量做到原子化(只做单纯的事情，无副作用)，但支持调用时传入参数。

开发某个项目页面前，首先要判断出来一个页面是预制页面还是配置页面，接下来要看对应业务页面的数据模型。数据模型确定后(现成的可复用的模型/有特异性需要开发的模型)，再确定其上的组件和插件。

### 需求分解示例

如下需求： 用户点击按钮 生成海报，分享完毕后调用一个接口通知服务端，更改用户的分享海报状态
则按照如下方式拆分： 
1. 按钮是可以搭建的组件，需要配置点击按钮后触发的 click 
2. 生成海报功能可以是插件，也就是生成海报并分享这个动作可以做多次，但不包括后续分享完毕调用接口的动作。
3. 分享完毕后调用接口的实现建议通过插件返回 Promise，请求本身封装成 Store 数据中的 action，然后在插件的 then 回调中触发，这个流程可以在 click 的 code 中来写。

### 脚手架优化方向

- 命令行交互增加项目类型
- 命令行交互新增可配置组件
- 命令行交互新增预制页面
- 命令行交互新增页面插件

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

3. 在action中约定公共的init方法和update方法，约定数据获取和更新的逻辑, 放在最外层store文件中
4. 针对可以在组件中使用的动态数据，直接在组件里面map对应模块的state？
  - 可能要写demo试一试 —— 可行
  - https://juejin.cn/post/6844903635873185806

5. 所有可配置的click事件都用eventHub来代理，Vue2中可以用Vue的实例
  - 跳转页面事件的触发
  - router跳转的触发
  - 针对调用 store 里面 mutation 方法的触发
  - 针对调用 store 里面 action 方法的触发

### 组件增加业务 projectType 过滤功能
由于某些组件的展示数据源和交互流程跟业务流程紧密相关，如商品选择、课程内容选择、购物车逻辑等，需要组件里面的逻辑直接操作业务数据。因此会出现某些组件只能用于某些业务场景，目前有两个思路来解决:
1. 在组件的配置JSON中增加可用业务枚举数组，只在某些业务页面中可选，缺点是如果某个组件可以同时用于两个业务，在组件里面需要针对当前的projectType来做数据的逻辑<这个参数需要传入组件中>。
2. 添加组件的数据转换层，把业务逻辑和组件展示和交互区分开，对每个组件的输入数据和操作数据都规定好，数据转换层负责把Store里面的数据映射到组件内部。优点是转换层用代码处理比较灵活。缺点是引入了新的复杂度，每次添加组件需要考虑转换层的逻辑，数据转换层的存在会导致数据流不清晰。

从维护和持续迭代角度，建议先按照第一种方案来做

### C端动态展现的页面开发
- 数据源来源：dataBase/0.json
- 所需要实现的功能
  1. 两种类型的页面解析
  2. 插件信息的解析的加载 ———— 插件的初始化确定是数据层的逻辑?
     - 插件的内容，初始化的参数在哪里配置？
     - 插件是否可以可配置？
  3. store信息的解析和加载
  4. 确定公共的store功能 ———— 打点
目录划分：
  - store
  - views
  - components: 如toast/确认弹窗等业务无关的组件
  - bootstrap未补充

有三种新建迭代模式：新增组件 & 新增页面(preBuildPages) & 新增工程类型

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
