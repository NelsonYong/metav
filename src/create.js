var inquirer = require("inquirer");

const {
  fnLoadingByOra,
  fetchReopLists,
  getTagLists,
  downDir,
  copyTempToLoclhost,
} = require("./utils/common");

module.exports = async (projectName) => {
  let repos = await fnLoadingByOra(fetchReopLists, "正在链接你的仓库...")();
  repos = repos.map((item) => item.name);
  // 使用inquirer 在命令行中可以交互
  const repoList = await inquirer.prompt([
    {
      type: "list",
      name: "repo",
      message: "请选择一个你要创建的项目",
      choices: repos,
    },
  ]);
  let tags = await fnLoadingByOra(
    getTagLists,
    `正在链接你的选择的仓库${repoList.repo}的版本号...`
  )(repoList.repo);

  tags = tags.map((item) => item.name);
  const { tag } = await inquirer.prompt([
    {
      type: "list",
      name: "tag",
      message: "请选择一个该项目的版本下载",
      choices: tags,
    },
  ]);

  console.log(`我现在选择了那个仓库？ ${repoList.repo}`);
  console.log(`仓库 ${repoList.repo}的版本信息列表：${tag}`);

  const res = await fnLoadingByOra(downDir, "下载项目中...")(
    repoList.repo,
    tag
  );
  await copyTempToLoclhost(res, projectName);
};
