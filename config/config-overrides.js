/* eslint-disable @typescript-eslint/no-var-requires */
const { override, addWebpackAlias } = require('customize-cra')
const path = require('path')

module.exports = override(
    // 配置绝对路径
    addWebpackAlias({
        // eslint-disable-next-line no-useless-computed-key
        ['@']: path.resolve(__dirname, '../src'),
    }),
)
