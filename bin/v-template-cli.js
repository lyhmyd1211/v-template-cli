#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const ora = require('ora');
const fs = require('fs-extra')
const program = require('commander')
var svn = require('node-svn-ultimate');
// const git = require('git-clone')
const updateNotifier = require('update-notifier')
const pkg = require('./../package.json')
// const debug = require('debug')
const shell = require('shelljs')
const inquirer = require('inquirer')
const log = require('tracer').colorConsole()
const Creator = require('../lib/create')
clear();

console.log(
  chalk.yellow(
    figlet.textSync('V-Template-Cli', { horizontalLayout: 'full' })
  )
);
const notifier = updateNotifier({
  pkg,
  updateCheckInterval: 1000 * 60
})

if (notifier.update) {
  log(`有可更新版本: ${notifier.update.latest},建议更新后使用`)
}
program
    .version('1.0.0')
    .description('xserver中间件应用模板工程的cli')
program
	.command('create  <project>')
	.description('run setup commands for all envs')
	.action(async (project) => {
		var pwd = shell.pwd()
		let path = pwd + `\\${project}`
		fs.pathExists(path, async (err, exists) => {
			if (exists) {
				await clear()
				await inquirer.prompt([
					{
						name: 'action',
						type: 'list',
						message: `Target directory ${chalk.cyan(path)} already exists. Pick an action:`,
						choices: [
							{ name: 'Overwrite', value: 'overwrite' },
							{ name: 'Cancel', value: false }
						]
					}
				]).then((answer) => {
					if (!answer) {
						return
					} else if (answer.action === 'overwrite') {
						const spinner = ora(`Removing ${chalk.cyan(path)}...`).start();
						fs.remove(path).then(async () => {
							spinner.succeed(`Remove ${chalk.cyan(path)} success`);
							// const creator = new Creator(path)
							// creator.create()
							const {choose} =  await inquirer.prompt([{
								type: 'list',
								message: 'Which template do you want to create?',
								name: 'choose',
								choices: [
									{ name: 'visual template', value: 'vi' },
									{ name: 'backstage template', value: 'sever' },
									{ name: 'Cancel', value: false }
								],
							}])
							const creator = new Creator(path,choose)
							creator.create()
						}).catch(err => {
							spinner.fail(`\nRemove ${chalk.cyan(path)} failed`,err);
							if (err) {  console.error(err) }
							})
						
						
						
					} else {
						return;
					}
					
				}).catch(err => {
					console.log('err',err);
				})
			
			} else {
				const {choose} =  await inquirer.prompt([{
					type: 'list',
					message: 'Which template do you want to create?',
					name: 'choose',
					choices: [
						{ name: 'visual template', value: 'vi' },
						{ name: 'backstage template', value: 'sever' },
						{ name: 'Cancel', value: false }
					],
				}])
				const creator = new Creator(path,choose)
				creator.create()
			}
		})
    
    })
program.parse(process.argv)