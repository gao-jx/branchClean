#!/usr/bin/env node
const inquirer = require('inquirer')
const {execSync} = require('child_process')

const fetchBranchSh = "git branch -vv | grep -v '^* ' | awk '{print $1}'"
const cleanBranchSh = "git branch -D "

const branchList = execSync(fetchBranchSh, {
  encoding: 'utf-8'
}).split('\n').map(item => {
  return {
    name: item
  }
}).filter(item => {
  return !!item.name
})

inquirer
  .prompt([
    {
      type: 'checkbox',
      message: 'selected branches',
      name: 'branches',
      choices: branchList,
      validate: function(answer) {
        if (answer.length < 1) {
          return 'You must choose at least one topping.';
        }
        return true;
      }
    }
  ])
  .then(answers => {
    // 如何将一个数组转化为stream
    answers.branches.forEach(branch => {
     execSync(cleanBranchSh + branch) 
    })
    process.exit(0)
  })
  .catch((err) => {
    process.echo('sorry, exec git fail')
    process.exit(1)
  })