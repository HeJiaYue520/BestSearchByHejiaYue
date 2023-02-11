### 安装使用步骤 📑

- **Clone：**

```text
# GitHub
git@github.com:HeJiaYue520/BestSearchByHejiaYue.git
```

- **Install：**

```text
npm install
cnpm install
yarn
# npm install 安装失败，请升级 nodejs 到 16 以上，或尝试使用以下命令：
npm install --registry=https://registry.npm.taobao.org
```

- **Run：**

```text
npm run dev
npm run serve
yarn dev
```

### 文件资源目录 📚

```text
Hooks-Admin
├─ .vscode                # vscode推荐配置
├─ public                 # 静态资源文件（忽略打包）
├─ src
│  ├─ api                 # API 接口管理
│  ├─ assets              # 静态资源文件
│  ├─ components          # 全局组件
│  ├─ config              # 全局配置项
│  ├─ enums               # 项目枚举
│  ├─ hooks               # 常用 Hooks
│  ├─ language            # 语言国际化
│  ├─ layouts             # 框架布局
│  ├─ routers             # 路由管理
│  ├─ redux               # redux store
│  ├─ styles              # 全局样式
│  ├─ typings             # 全局 ts 声明
│  ├─ utils               # 工具库
│  ├─ views               # 项目所有页面
│  ├─ App.tsx             # 入口页面
│  ├─ main.tsx            # 入口文件
│  └─ env.d.ts            # vite 声明文件
├─ .editorconfig          # 编辑器配置（格式化）
├─ .env                   # vite 常用配置
├─ .env.development       # 开发环境配置
├─ .env.production        # 生产环境配置
├─ .env.test              # 测试环境配置
├─ .eslintignore          # 忽略 Eslint 校验
├─ .eslintrc.js           # Eslint 校验配置
├─ .gitignore             # git 提交忽略
├─ .prettierignore        # 忽略 prettier 格式化
├─ .prettierrc.js         # prettier 配置
├─ .stylelintignore       # 忽略 stylelint 格式化
├─ .stylelintrc.js        # stylelint 样式格式化配置
├─ CHANGELOG.md           # 项目更新日志
├─ commitlint.config.js   # git 提交规范配置
├─ index.html             # 入口 html
├─ LICENSE                # 开源协议文件
├─ lint-staged.config     # lint-staged 配置文件
├─ package-lock.json      # 依赖包包版本锁
├─ package.json           # 依赖包管理
├─ postcss.config.js      # postcss 配置
├─ README.md              # README 介绍
├─ tsconfig.json          # typescript 全局配置
└─ vite.config.ts         # vite 配置
```

### 搜索页面说明文档

##### 1. 页面文件位置及开发思路

###### 视图层 view

- 搜索首页代码是在 `/src/views/bestSearch` 文件中 的 `index` 文件中，样式文件使用简单的媒体查询。
- 搜索详情页放在`/src/views/bestSearch/Component`  组件文件中，样式文件中，头部搜索和整体布局使用媒体查询控制，组件展示部分使用 `Material UI ` 中的 `Grid` 组件 ，设置了 `columns` 属性在 4,8,12 三种状态下的网格展示
- 组件文件有两个组件，一个是搜索详情页，一个是封装好的的自定义 Echarts 组件，Echarts 组件是为了渲染数组的图标组件，所以分开封装。

###### 路由配置 ReactRouter

- 因为是两个简单的页面，所以路由直接在 `/src/routers/index.tsx` 文件中直接配置，当然为了满足题目的跳转传参规则，我使用了 React-Router 的动态路由传参。这种传参方法在接收参数时使用 `react-router-dom` 中的 `useParams` 进行接收即可

###### 状态管理 Redux Redux-thunk

- 在`/src/redux/modules` 中新建 search 文件夹，并在文件中添加好 `action.tsx` 文件和 `reducer.tsx` 文件 ，并写好的 reducer 和 action 方法抛出，然后在统一地方  `mutation-types.tsx` 文件中配置好这个 reducerd 的唯一 type 值。 最后在 `/src/redux` 文件的 `index.tsx` 统一接收并拆分，并使用 `reduxThunk` 中间件。
- 在搜索详情页中，使用 `react-redux` 中的 connect 方法，在函数式组件最下方将 searchState 和 searchDetails 页面组件 进行绑定。这样就可以在页面中调用完接口后，使用从 组价的 props 中解构出来的 dispatch 方法，去触发 reducer 的执行将这个模块的中的状态保存。然后再从 props 中解构出保存好的状态，进行页面的渲染。

```tsx
const mapStateToProps = (state: any) => state.search;
export default connect(mapStateToProps)(searchDetails);
```

###### 网络调接口 API

- 在 `/src/api/modules` 文件中，创建新的 search 模块，即 `search.tsx `。在模块中写好调接口的方法，使用的是封装好的，已经走过拦截器的接口方法。这里发现需要调的接口会有跨域问题，并且因为这个项目我自己有些过 node 接口，所以之前的默认请求地址，是我本地的 node 服务器的 ip 地址。所以在拦截器中需要重新改写默认的请求地址，而且要在 `Vite.cofig.ts` 文件中配置 `proxy` 跨域代理。

  > 这块地方因为配置好代理之后，调接口发现报404，所以又去测试了一遍，还去拿 postman 进行了测试，最终发现是目标代理地址 没有设置成本地的 
  >
  > `http://localhost:3000` 服务导致的。

###### 其他使用到的文件

- 使用到了 `/src/utils/utils.tsx `中设置 localStorage 的方法，用于在搜索详情页的聚焦事件，跳转到搜索页首页时，缓存当前搜索的 `value` 值

2. ##### 页面的功能介绍

```txt
1.页面在搜索框内容为空时，点击回车或者搜索按钮，会报非空判断提示，提示用的也是 MUI 的 Snackbar 提示框。
2.当点击搜索后，进行页面的跳转，并将参数拼接在路由URL的后面，如果搜索框中有空格，则将空格转成 + 号，进行拼接。跳转页面成功后，调用搜索接口，等待返回值。显示Loading状态，这个是之前封装好的接口懒加载动画。
3.当有返回值后，展示数据。当再次点击搜索框时，触发聚焦事件，则页面会跳转到搜索首页，并将当前的 value 值进行保存在 localStorage 中，进行首页的输入框回显，回显完成就会移除掉刚刚设置的 localStorage 内容。再次点击回车和搜索按钮，则和上面跳转方法一致。
```



注释：如果觉得这样跳转体验不太好，可以将`searchDetails.tsx` 文件中的 搜索接口调用方法中的注释打开，并将 `获取焦点事件` 方法中的 跳转放发注释即可。这样写因为我有一点自己的想法，我个人认为用户所见，即所得比较好一些。因为视频中也没有展示搜索后的的跳转逻辑所以，这一块暂时就按自己的想法写了。

还有 所有的项目中分两种写法，一个是在action中调用API，一种是在页面中调用。第二者注释了，放开效果是一样的。
