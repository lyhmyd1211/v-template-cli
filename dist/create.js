const shell = require('shelljs')
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer')
const clone = require('git-clone')
const {removeDir}  = require('../utils/index')
module.exports = class Creator {
  constructor(path,type) {
		this.path = path
		this.type = type
  }
  async create() {
    const {path,type} = this
		let url  = 'https://github.com/lyhmyd1211/v-templates.git'
				const spinner = ora(`template contributing...`).start();
				await clone(url, path,{checkout:type}, async ( err) => {
					if (err) {
						spinner.fail(`template contribute failed. ${err}`,);
						return console.error(err)
					}
					try {
						spinner.succeed(`Successfully contribute template`);
						shell.cd(path)
						await inquirer.prompt([
							{
								name: 'install',
								type: 'list',
								message: `install dependencies immediately?`,
								choices: [
									{ name: 'YES(npm install)', value: 'Y' },
									{ name: 'NO', value: 'N' }
								]
							}
						]).then((answer) => {
							if (!answer) {
								return
							} else if (answer.install === 'Y') {
								const spinner1 = ora(`dependencies installing... `).start();
								shell.exec('npm install', function (code, stdout, stderr) {
									console.log('Exit code:', code);
									console.log('Program output:', stdout);
									console.log('Program stderr:', stderr);
										spinner1.succeed(`Successfully install dependencies `);
									removeDir(`${path}/.git`, function () {
										spinner.succeed(`${chalk.green(`all done. run by executing :\n\n     cd ${path} \n     npm start \n`)}`);
									})
								});
							} else {
								removeDir(`${path}/.git`, function () {
									spinner.succeed(`${chalk.green(`all done. install dependencies by executing :\n\n     cd ${path} \n     npm install. \n\n  And run by executing:\n     npm start \n`)}`);
								})
							}
						}).catch(err => {
							console.log('err',err);
						})
					
						
					} catch (error) {
						spinner.fail(`template contribute failed. ${error}`);
					}
				
				})
  }
}