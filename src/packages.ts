import { Package, PackageType } from "./types/packages";

let packages: Package[] = [
	{
		type: PackageType.Dep,
		name: 'express'
	},
	{
		type: PackageType.Dep,
		name: 'morgan'
	},
	{
		'type': PackageType.DevDep,
		name: 'nodemon'	
	},
	{
		'type': PackageType.DevDep,
		name: '@types/node'	
	},
	{
		'type': PackageType.DevDep,
		name: 'ts-node'	
	},
	{
		'type': PackageType.DevDep,
		name: 'typescript'	
	},
	{
		type: PackageType.DevDep,
		name: '@types/express'
	},
	{
		type: PackageType.DevDep,
		name: '@types/morgan'
	}
]

export default packages