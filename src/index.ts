#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'
import chalk from 'chalk'
import {exec, execSync} from 'child_process'
import { Package, PackageType } from './types/packages'
import Packages from './packages'
import Scripts from './scripts'
import yargs from 'yargs'

const CURR_DIR = process.cwd()

const QUESTIONS = [
	{
		name: 'projectName',
		type: 'input',
		message: 'Project name:',
	},
]

const createProjectFolder = (folder: string, name: string) => {
	if(fs.existsSync(folder)) {
		console.log(chalk.red(`Folder "${name}" is now exists. Delete or use another name.`))
		return false
	}
	fs.mkdirSync(folder)
	return true
}

const initProject = (folder: string) => {
	execSync('npm init -f', {cwd: folder, stdio: 'pipe'})
}

const getPackages = (answer: any) => {
	return Packages
}

const addScripts = (folder: string) => {
	let file = fs.readFileSync(path.join(folder, 'package.json'))
	const data = file
		.toString()
		.replace(
			'"test": "echo \\"Error: no test specified\\" && exit 1"',
			Scripts
		)
	fs.writeFileSync(path.join(folder, 'package.json'), data)
}

const installPackes = (folder: string, packages: Package[]) => {
	let devPackages = packages.filter((item: Package) => item.type === PackageType.DevDep)
	let execString = 'npm install --save-dev'
	for(let i = 0; i < devPackages.length; i++) {
		execString += ' ' + devPackages[i].name
		if(devPackages[i].version) {
			execString += '@' + devPackages[i].version
		}
	}
	execSync(execString, {cwd: folder, stdio: 'pipe'})

	let another = packages.filter((item: Package) => item.type === PackageType.Dep)
	execString = 'npm install --save'
	for(let i = 0; i < another.length; i++) {
		execString += ' ' + another[i].name
		if(another[i].version) {
			execString += '@' + another[i].version
		}
	}
	execSync(execString, {cwd: folder, stdio: 'pipe'})
}

const createDirectoryContents = (templatePath: string, projectName: string) => {
	const filesToCreate = fs.readdirSync(templatePath);
	filesToCreate.forEach(file => {
		const origFilePath = path.join(templatePath, file);
		
		const stats = fs.statSync(origFilePath);
		
		if (stats.isFile()) {
			let contents = fs.readFileSync(origFilePath, 'utf8');
			const writePath = path.join(CURR_DIR, projectName, file);
			fs.writeFileSync(writePath, contents, 'utf8');
		} else if (stats.isDirectory()) {
			fs.mkdirSync(path.join(CURR_DIR, projectName, file));
			createDirectoryContents(path.join(templatePath, file), path.join(projectName, file));
		}
	});
}

inquirer.prompt(QUESTIONS)
	.then(answer => {
		let folder = path.join(CURR_DIR, answer.projectName)
		let result = createProjectFolder(folder, answer.projectName)
		if(!result) {
			return 
		}
		initProject(folder)
		process.stdout.write(chalk.yellow(`Installing packages `))
		installPackes(folder, getPackages(answer))
		console.log(chalk.green(`Done`))
		process.stdout.write(chalk.yellow(`Creating files `))
		createDirectoryContents(path.join(__dirname, 'files'), answer.projectName)
		console.log(chalk.green(`Done`))
		addScripts(folder)
		console.log(chalk.green(`Done. Let's go hacking`))
	})