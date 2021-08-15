import { IModelAttributes } from './Model';

export class Attributes<T> implements IModelAttributes<T> {
	constructor(private data: T) {}

	get = <K extends keyof T>(propName: K): T[K] => {
		return this.data[propName];
	}

	set = (propObject: T): void => {
		Object.assign(this.data, propObject);
	}

	getAll = (): T => {
		return this.data;
	}
}
