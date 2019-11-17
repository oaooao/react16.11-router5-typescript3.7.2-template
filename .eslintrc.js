module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'plugin:react/recommended', // 使用推荐的React代码检测规范
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration the extends array.
    ],
    parserOptions: {
        ecmaVersion: 2019, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    },
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
