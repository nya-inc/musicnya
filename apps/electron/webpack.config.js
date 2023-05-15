import path from 'path';

module.exports = {
  resolve: {
    alias: {
      core: path.join(__dirname, 'src/app/express'),
    },
  },
  pluginOptions: {
    electronBuilder: {
      nodeModulesPath: ['../../node_modules'],
    },
  },
};
