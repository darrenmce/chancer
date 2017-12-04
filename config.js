const { name } = require('./package.json');

module.exports = require('rc')(name, {
  appName: name,
  allowed: ['name', 'address'],
  port: 8080
});