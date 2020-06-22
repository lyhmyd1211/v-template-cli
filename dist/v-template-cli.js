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
  chalk.green(
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
    .version('0.0.1')
    .description('构建vue中后台、可视化、h5模板工程的cli')
program
	.command('create  <project>')
	.description('run create <fileName> commands for create a template')
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
									{ name: 'visual template', value: 'visual' },
									{ name: 'backstage template', value: 'admin' },
									{ name: 'h5 template', value: 'app' },
									{ name: 'Cancel', value: false }
								],
							}])
							if (choose) {
								const creator = new Creator(path,choose)
								creator.create()
							} else {
								console.log('user cancel');
							}
						
						}).catch(err => {
							spinner.fail(`\nRemove ${chalk.cyan(path)} failed`,err);
							if (err) {  console.error(err) }
							})
						
						
						
					} else {
						console.log('user cancel');
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
						{ name: 'visual template', value: 'visual' },
						{ name: 'backstage template', value: 'admin' },
						{ name: 'h5 template', value: 'app' },
						{ name: 'Cancel', value: false }
					],
				}])
				if (choose) {
					const creator = new Creator(path,choose)
					creator.create()
				}else {
					console.log('user cancel');
				}
			
			}
		})
    
    })
program.parse(process.argv)