# React16.11 + Typescript3.7.2 + React-Router 模版 &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

### 1. 利用 [create-react-app](https://create-react-app.dev/docs/adding-typescript/#!) 生成开箱即用的 ts 版本的 react 项目模版

```bash
npx create-react-app my-app --typescript
# or
yarn create react-app my-app --typescript
```

### 2. 清空无用的样板文件 `src/App.css` ，然后去除 `src/App.tsx` 的样板代码，改完了应该如下所示：

```js
import React from 'react'

const App: React.FC = () => {
    return <div className="App"></div>
}

export default App
```

### 3. 引入 [react-app-rewired](https://github.com/timarney/react-app-rewired/blob/master/README_zh.md) 和 [customize-cra](https://github.com/arackaf/customize-cra) 来对 reate-react-app 的默认配置进行扩展

#### a). 安装 customize-cra 和 react-app-rewired

```bash
yarn add customize-cra react-app-rewired --dev
```

#### b). 在根目录中创建一个 `config/config-overrides.js` 文件

```js
/* config-overrides.js */

const { override, addWebpackAlias } = require('customize-cra')
const path = require('path')

module.exports = override(
    // 配置绝对路径
    addWebpackAlias({
        // eslint-disable-next-line no-useless-computed-key
        ['@']: path.resolve(__dirname, '../src'),
    }),
)
```

#### c). 更新 `package.json` 文件

```json
/* package.json */

  // 配置文件存放的路径也要配置一下，如果没有放在根路径的话
+ "config-overrides-path": "config/config-overrides.js",

  "scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test --env=jsdom",
+   "test": "react-app-rewired test --env=jsdom",
    "eject": "react-scripts eject"
}
```

#### d). 启动 Dev Server 测试功能是否完好

```bash
npm start
```

### 4. 利用 [Eslint](https://eslint.org/) 和 [Prettier](https://prettier.io/) 实现代码约束和代码自动格式化

#### a). 引入 Eslint 规范 typescript 代码

```bash
yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --dev
```

> :warning: Note: If using create-react-app to bootstrap a project, eslint is already included as a dependency through react-scripts, and therefore it is not necessary to explicitly install it with yarn.

-   **eslint** ESLint 的核心库
-   **@typescript-eslint/parser** 允许解析 TypeScript 代码的 ESLint 解析器
-   **@typescript-eslint/eslint-plugin** ESLint 插件，包含了各种定义好的检测 Typescript 代码的规范

安装好这 3 个依赖包之后，在根目录下新建 `.eslintrc.js` 文件，该文件中定义了 ESLint 的基础配置

下面是一个配置示例：

```js
/* .eslintrc.js */

module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    ],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    },
}
```

这是一个更详细的配置配置示例:

```js
/* .eslintrc.js */

module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser,The parser that will allow ESLint to lint TypeScript code
    extends: [
        // 'react-app',
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    ],
    parserOptions: {
        ecmaVersion: 2019, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    plugins: [
        '@typescript-eslint', // A plugin that contains a bunch of ESLint rules that are TypeScript specific
        'react',
    ],
    // rules below has been set that applies to all JavaScript and TypeScript files
    rules: {},
    // rules below has been set that only targets Typescript files
    overrides: [
        {
            files: ['**/*.ts?(x)'],
            rules: {
                '@typescript-eslint/explicit-function-return-type': [
                    'warn',
                    {
                        allowExpressions: true,
                        allowTypedFunctionExpressions: true,
                    },
                ],
                '@typescript-eslint/interface-name-prefix': 0,
            },
        },
    ],
    // 指定代码的运行环境
    env: {
        browser: true,
        node: true,
        jasmine: true,
        jest: true,
    },
    // 自动发现React的版本，从而进行规范react代码
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
            pragma: 'React',
        },
    },
}
```

#### b). 结合 prettier

Eslint 结合 Prettier 会产生更好的效果，Eslint 只是负责给出代码的错误提示，而 Prettier 可以自动帮助开发人员按预先照配置的代码格式进行格式化，使用 Prettier 前需要安装一些依赖:

```js
yarn add prettier eslint-config-prettier eslint-plugin-prettier --dev
```

-   **prettier** prettier 核心库
-   **eslint-config-prettier** 解决 ESLint 中的规则和 prettier 中规则的冲突，以 prettier 的规则为准，使 ESLint 中的规则自动失效
-   **eslint-plugin-prettier**：将 prettier 作为 ESLint 规则来使用

为了配置 prettier, 需要在项目的根目录下创建 `.prettierrc.js` 文件。

下面是一个配置示例：

```js
/* .prettierrc.js */

module.exports = {
    semi: false,
    trailingComma: 'all',
    singleQuote: true,
    printWidth: 120,
    tabWidth: 4,
}
```

然后还需要更新一下 `.eslintrc.js` 文件:

```js
/* .eslintrc.js */

module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    parserOptions: {
        ecmaVersion: 2019, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
}
```

#### c). 通过如下的配置把 eslint 和 prettier 集成到 VS Code, 然后就可以自动格式化代码了

让编辑器帮我们自动格式化代码可以提高我们的生产力。

首先安装 VSCode 的 Eslint 插件，然后去 `settings.json` 文件中添加配置:

```json
{
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        { "language": "typescript", "autoFix": true },
        { "language": "typescriptreact", "autoFix": true }
    ]
}
```

> 注意: 如果你的`settings.json`文件中的`editor.formatOnSave`选项的值是`true`，那么你还需要添加如下的配置以防止在保存 js 文件或者 ts 文件时执行两次格式化命令。
>
> ```json
> {
>     "editor.formatOnSave": true,
>     "[javascript]": {
>         "editor.formatOnSave": false
>     },
>     "[javascriptreact]": {
>         "editor.formatOnSave": false
>     },
>     "[typescript]": {
>         "editor.formatOnSave": false
>     },
>     "[typescriptreact]": {
>         "editor.formatOnSave": false
>     }
> }
> ```

#### d). 将 Eslint 集成到项目的脚本命令

在`package.json`文件里面添加一条`scripts`命令`lint`，它会用`Typescript编译器`和`Eslint规则`把项目中的所有文件运行一遍，以确保项目中的所有代码都是可以编译通过且符合 Eslint 规范的。

```json
{
    "scripts": {
        "lint": "tsc --noEmit && eslint '*/**/*.{js,ts,tsx}' --quiet --fix"
    }
}
```

你可以在在命令行输入 `npm run lint` 或者 `yarn lint` 来运行上述命令，这条命令开始执行之后，首先会运行 Typescript 的编译器去编译所有的 `.ts` 和 `.tsx` 文件，如果编译的过程中有错误，会将错误发送到终端，如果没有错误，则会对所有的`.js` `.ts` `.tsx`文件进行 Eslint 检查，当 Eslint 检查器遇到可以被自动修复的错误就会直接将它们修复，不能被自动修复的错误就会被发送到终端

#### e). 配置 git 提交前的代码检测

为了保证提交到 git 仓库的代码都是合乎规范的，我们可以利用 [git hooks](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90) 在提交前的时机做一轮代码质量检测，这个过程里面既可以执行单元测试，也可以运行 Lint 检查，当然如果是 typescript 的项目还可以调用 typescript 编译器去编译目标代码，以防止任何可能导致 typescript 编译失败的提交。

接下来通过 [husky](https://github.com/typicode/husky) 这个工具来使用 git hooks 的功能，首先安装 husky :

```
yarn add -D husky
```

然后更新 `package.json` 文件:

```json
{
    .....
    "husky": {
        "hooks": {
            "pre-commit": "npm run lint"
        }
    },
}
```

完成了上面的配置以后，可以保证我们每次提交的时候都会先自动执行 `npm run lint` 脚本，然后 eslint 的检查器就会检查一遍当前工作区的所有代码，会有三种情况发生:

-   一切正常，没有代码格式错误，则正常提交
-   有格式错误，但这些错误都是属于可以被自动修复的错误，那么 linter 就会修复该错误，再正常提交
-   有格式错误且存在不能被自动修复的错误，那么本次提交就会被打断，促使开发者根据错误提示去手动修改代码，改好以后方能再此提交

为了保证提交的代码质量，我们已经做了一些基础的配置，但是还不够彻底，接下来需要再引入一个工具来完善我们的 git hooks 阶段的代码质量检测。

思考这样一个问题，如果现在这个项目是由多人维护的历史项目，项目的早期没有 lint 规范的约束，必然会有很多不能通过当前 eslint 规则检查的代码，这种情况下如果我们还是一如既往的在提交前运行`npm run lint`命令的话，就会被历史代码引发的 lint 错误淹没，总不能再一个个去修复这些老文件引起的报错吧！所以这时候就可以引入 [lint-staged](https://github.com/okonet/lint-staged) 这个库来帮助我们解决这种问题，使用 lint-staged 可以缩小我们在 commit 前代码检测的范围至待提交的文件，简单来说就是有了它之后，当 pre-commit 钩子再次被触发时，Eslint 只会检查 git 缓存区的文件（即待提交的文件，也即本次修改版本的增量文件），这样一来不仅解决了上述场景可能的问题，也大大缩短了 lint 检查的时间（因为只需要检测增量文件），使用之前先安装:

```bash
yarn add -D lint-staged
```

安装完了之后，需要更新 `package.json` 来使用它:

```json
{
    .....
    "husky": {
        "hooks": {
            "pre-commit": "lint-staged"
        }
    },
    "lint-staged": {
        "*.{js,ts,tsx}": [
            "eslint . --fix",
            "git add"
        ]
    }
}
```

在代码编辑器的辅助下，一般我们都可以提前获知到 ts 编译错误，但是不怕一万就怕万一，有时候我们可能会因为疏忽没有看到错误提示，然后就直接的提交了，为了杜绝此类问题，干脆在 pre-commit 阶段再执行一下 typescript 的编译过程，为了完成这个目的，需要再更新一下 `package.json` 文件:

```json
{
    .....
    "husky": {
        "hooks": {
            "pre-commit": "tsc --noEmit && lint-staged"
        }
    },
    "lint-staged": {
        "*.{js,ts,tsx}": [
            "eslint . --fix",
            "git add"
        ]
    }
}
```

### 5. 引入 [React-Router](https://reacttraining.com/react-router/web/guides/quick-start)

```bash
npm install react-router-dom @types/react-router-dom
```
