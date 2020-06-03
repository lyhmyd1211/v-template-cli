const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
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
    figlet.textSync('Vue-Template-Cli', { horizontalLayout: 'full' })
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
							{ name: 'Merge', value: 'merge' },
							{ name: 'Cancel', value: false }
						]
					}
				]).then((answer) => {
					if (!answer) {
						return
					} else if (answer.action === 'overwrite') {
						console.log(`\nRemoving ${chalk.cyan(path)}...`)
						fs.remove(path).then(async () => {
							console.log('deletes');
							clear()
							const creator = new Creator(path)
							creator.create()
						}).catch(err => {
							if (err) {  console.error(err) }
							})
						
						
						
						
					} else {
						return;
					}
					
				})
			
			} else {
				const creator = new Creator(path)
				return creator.create()
			}
		})
	
		// inquirer.registerPrompt('selectLine', require('inquirer-select-line'));
		// inquirer.prompt([{
		// 	type: 'list',
		// 	message: 'Which template do you want to create?',
		// 	name: 'template',
		// 	choices: ['visualization', 'second', 'third', 'fourth'],
		// }]).then((answers) => {
		
		// 	var pwd = shell.pwd()
		// 	console.log('object',answers.template, project);
		// 	switch (answers.template) {
				
		// 		case 'visualization':
		// 			log.info('模板工程建立。。')
		// 			svn.commands.checkout(`https://github.com/lyhmyd1211/v-template-cli/trunk/pacages/vue-admin-template`, pwd + `\\${project}`,  (err)=> {
		// 				shell.rm('-rf', pwd + `\\${project}\\.svn`)
		// 				console.log('rf',pwd + `\\${project}\\.svn`,err);
		// 				log.info('模板工程建立完成')
		// 			})
		// 			// clone(`https://github.com/lyhmyd1211/v-template-cli/pacages/vue-admin-template`, pwd + `/${project}`, null, function() {
		// 			// 	shell.rm('-rf', pwd + `/${project}/.git`)
					
		// 			// 	log.info('模板工程建立完成')
		// 			// })
		// 			break;
			
		// 		default:
		// 			// console.log('and', answers.template);
		// 			// clone(`https://github.com/lyhmyd1211/v-template-cli/pacages/vue-admin-template`, pwd + `/${project}`, null, function() {
		// 			// 	shell.rm('-rf', pwd + `/${project}/.git`)
		// 			// 	log.info('模板工程建立完成')
		// 			// })
		// 			break;
		// 	}
				/*
				OUTPUT :
				Chosen line: 2
				*/
		// });
    
    })
program.parse(process.argv)