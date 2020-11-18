const {
    prompt
} = require('inquirer')  // 一个用户与命令行交互的工具
const chalk = require('chalk')
const download = require('download-git-repo') // 一个下载远程git文件的工具
const ora = require('ora') // 一个代码美化库

// 用户的交互
const question = [{
    type: 'input', // 问题类型为填空题
    name: 'projectName',  // 问题对应的属性
    message: 'Project name:', // 问题描述
    validate(val) { // 对输入的值做判断
        if (val !== '') {
            return true
        }
        return 'Project name is required!'
    }
}]

module.exports = prompt(question).then(({
                                            projectName
                                        }) => {
    const spinner = ora('Downloading xd-es-cli...')

    spinner.start()

    // url、target、
    download(`github:6xiaoDi/my-es-parser`, `./${projectName}`, (err) => {
        if (err) {
            console.log(chalk.red(err))
            process.exit()
        }
        spinner.stop()
        console.log(chalk.green('New project has been initialized successfully!'))
    })
})