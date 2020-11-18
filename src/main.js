// 定义脚手架的文件路径，__dirname是当前文件所在的路径
process.env.NODE_PATH = __dirname + '/../node_modules/'

const {
    resolve
} = require('path')

const res = command => resolve(__dirname, './commands/', command)

const program = require('commander')

// 获取package.json中的version来做为项目的版本号
program
    .version(require('../package').version)

// 定义脚手架的用法，在program.help方法中会显示
program
    .usage('<command>')

// commander 解析完成后会触发action回调方法
program
    .command('init')  // init指令
    .description('Generate a new project')  // 命令描述
    .alias('i') // 命令别名
    .action(() => {  // 动作
        require(res('init')) // 调用commands的init.js文件
    })

// program.parse(arguments)会处理参数，没有被使用的选项会被存放在program.args数组中
program.parse(process.argv) // 加入这个能获取到项目名称

let projectName = program.rawArgs[2] // 获取项目名称

//  项目名称容错
if (!projectName) {  // project-name 必填  如果没有输入名称执行helphelp
    program.help()// 相当于执行命令的--help选项，显示help信息，这是commander内置的一个命令选项
    return
}
