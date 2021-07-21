export enum PackageType {
	DevDep,
	Dep
}

export interface Package {
	type: PackageType,
	name: string,
	version?: string,
}