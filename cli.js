#!/usr/bin/env node

// Node Cli 应用文件必须要有这样的文件头
// 如果是 Linux 或者 macOS 还需要修改文件的读写权限 755
// 具体就是通过 chmod 755 cli.js 实现修改

// 命令行：sample-scaffolding，执行cli应用
console.log('cli working')

// 实现脚手架的工作过程
// 1.通过命令行交互询问用户问题
// 2.根据用户回答的结果生成文件

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ejs = require('ejs')

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Project name???'
  }
])
.then(answers => {
  console.log(answers) // { name: '输入的值' }  { name: 'rds' }
  // 根据用户回答的结果生成文件

  // 模板目录
  const tmpDir = path.join(__dirname, 'templates') // __dirname：被执行js文件所在的文件夹目录，绝对路径
  // 目标目录
  const destDir = process.cwd() // cwd是指当前命令行窗口node命令执行时所在的文件夹目录，绝对路径
  // 将模板下的文件输出到目标目录
  fs.readdir(tmpDir, (err, files) => {
    // console.log(files) // [ 'index.html', 'style.css' ]
    if (err) throw err
    files.forEach(file => {
      // 通过模板引擎渲染文件
      ejs.renderFile(path.join(tmpDir, file), answers, (err, result) => {
        if (err) throw err
        // console.log(result) // 打印出的就是通过{ name: 输入的值 }渲染出来的index.html和style.css

        // 最后把结果写入到输出目录
        fs.writeFileSync(path.join(destDir, file), result)
      })
    })
  })
})