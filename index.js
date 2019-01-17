const inquirer = require('inquirer')
const {execSync} = require('child_process')
const util = require('util')

const branchList = execSync('git branch', {
  encoding: 'utf-8'
})
console.info(branchList)