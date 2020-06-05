const shell = require('shelljs')
const chalk = require('chalk');
const ora = require('ora');
const process = require('process');
const inquirer = require('inquirer')
const svn = require('node-svn-ultimate');
// const fs = require('fs-extra')
const fs = require('fs')
const {autoRetry,compareVersion}  = require('../utils/index')
module.exports = class Creator {
  constructor(path,type) {
		this.path = path
		this.type = type
  }
  async create() {
    const {path,type} = this
		let url  = ''
		switch (type) {
			case 'vi':
				url = 'https://github.com/lyhmyd1211/v-templates/trunk/vue-visual-template'
				break;
			case 'sever':
				url = 'https://github.com/lyhmyd1211/v-templates/trunk/vue-admin-template'
				break;
			default:
				break;
		}
				const spinner = ora(`template contributing...`).start();
				await svn.commands.checkout(url, path, async ( err) => {
					if (err) {
						spinner.fail(`template contribute failed. ${err}`,);
						return console.error(err)
					}
					await svn.commands.cleanup(path)
					try {
						// await fs.removeSync(`${path}/.svn`)
						spinner.succeed(`Successfully contribute template`);
						const spinner1 = ora(`modules installing... `).start();
						shell.cd(path)
						shell.exec('npm install', function (code, stdout, stderr) {
							console.log('Exit code:', code);
							console.log('Program output:', stdout);
							console.log('Program stderr:', stderr);
							// if (stderr) {
							// 	spinner1.fail(`modules install failed. ${stderr}`,);
							// } else {
								spinner1.succeed(`Successfully install modules `);
								if (compareVersion('v12.10.0')) {
									fs.rmdir(`${path}/.svn`, { maxRetries: 5, recursive: true }, err => {
										if (err) {
											spinner.fail(`remove .svn failed. ${err}`,);
										} else {
											spinner.succeed(`${chalk.green('all done. enjoy it!!')}`);
										}
									})
								} else {
									let fn = autoRetry(fs.rmdir(`${path}/.svn`), 5)
									fn.then(res => {
										spinner.succeed(`${chalk.green('all done. enjoy it!!')}`);
									}).catch(err => {
										spinner.fail(`remove .svn failed. ${err}`,);
									})
							}
							
						});
						
					} catch (error) {
						spinner.fail(`template contribute failed. ${error}`);
					}
				
				})
  }
}