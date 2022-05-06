const { resolve } = require("path");
// 存放用户的所需要的常量
const { name, version } = require("../../package.json");

// const downloadDirectory = `${
//   process.env[process.platform === "darwin" ? "HOME" : "USERPROFILE"]
// }/myTemplate`;

const downloadDirectory = process.cwd();

module.exports = {
  name,
  version,
  downloadDirectory,
};
