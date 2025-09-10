const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    blockList: exclusionList([
      /ios\/build\/.*/,
      /ios\/Pods\/.*/,
      /android\/app\/build\/.*/,
      /android\/build\/.*/,
      /android\/\.gradle\/.*/,
      /node_modules\/\.cache\/.*/,
      /\.git\/.*/,
    ]),
    // 解决 SHA-1 计算问题
    unstable_enableSymlinks: false,
    unstable_enablePackageExports: false,
    // 解决 whatwg-fetch 模块解析问题
    alias: {
      'whatwg-fetch': require.resolve('whatwg-fetch'),
    },
  },
  // 添加 watchman 配置
  watchman: {
    deferStates: ['hg.update'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
