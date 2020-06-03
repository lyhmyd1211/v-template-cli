const shell = require('shelljs')
const inquirer = require('inquirer')
const svn = require('node-svn-ultimate');
module.exports = class Creator {
  constructor(path) {
    this.path = path
  }
  async create() {
    const {path} = this
    
		const {choose} =  await inquirer.prompt([{
				type: 'list',
				message: 'Which template do you want to create?',
				name: 'choose',
				choices: [
					{ name: 'visualization', value: 'vi' },
					{ name: 'Merge', value: 'merge' },
					{ name: 'Cancel', value: false }
				],
		}])
		console.log('choose',choose);
		switch (choose) {
			case 'vi':
				console.log(`\ntemplate contributing...`)
				await svn.commands.checkout(`https://github.com/lyhmyd1211/v-template-cli/trunk/pacages/vue-admin-template`,path).then((err) => {
					shell.rm('-rf', `${path}\\.svn`)
					 console.log('rf',`${path}\\.svn`,err);
					 console.log(`complete...`)
				 })
				break;
		
			default:
				break;
		}
  }
}