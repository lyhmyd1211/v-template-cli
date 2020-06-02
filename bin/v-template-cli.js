const program = require('commander')
// const updateNotifier = require('update-notifier')
// const pkg = require('./../package.json')
// const debug = require('debug')
// const shell = require('shelljs')
const inquirer = require('inquirer')

// const notifier = updateNotifier({
//   pkg,
//   updateCheckInterval: 1000 * 60
// })

// if (notifier.update) {
//   console.log(`有可更新版本: ${notifier.update.latest},建议更新后使用`)
// }
program
    .version('1.0.0')
    .description('xserver中间件应用模板工程的cli')
program
	.command('create <app-name>')
	.description('run setup commands for all envs')
	.action(function (tpl, project) {
		inquirer.registerPrompt('selectLine', require('inquirer-select-line'));
		inquirer.prompt([{
			type: 'selectLine',
			message: 'Where add line?',
			name: 'line',
			choices: ['first', 'second', 'third', 'fourth'],
		}]).then(function (answers) {
			console.log('answers',answers);
				/*
				OUTPUT :
				Chosen line: 2
				*/
		});
    
    })
program.parse(process.argv)