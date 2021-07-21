import { Package, PackageType } from "../types/packages";

let packages: Package[] = [
	{
		type: PackageType.Dep,
		name: 'express'
	},
	{
		type: PackageType.Dep,
		name: 'morgan'
	}
]

export default packages