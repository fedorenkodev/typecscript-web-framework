import { AxiosPromise, AxiosResponse } from 'axios';

type Callback<T> = (data?: any) => void;

export interface IHasId {
	id?: number;
}

export interface IEventsManager<T> {
	addListener(eventName: string, cb: Callback<T>): void;
	removeListener(eventName: string, cb: Callback<T>): void;
	trigger(eventName: string, data?: any): void;
}

export interface IModelAttributes<T> {
	get<K extends keyof T>(propName: K): T[K];
	set(propObject: T): void;
	getAll(): T;
}

export interface ISync<T> {
	fetch(id: number): AxiosPromise;
	save(data: T): AxiosPromise;
}

export class Model<T extends IHasId> {
	public constructor(
		protected eventsManager: IEventsManager<T>,
		protected attributes: IModelAttributes<T>,
		protected sync: ISync<T>,
	) {}

	get = this.attributes.get;

	set(data: T): void {
		this.attributes.set(data);

		this.eventsManager.trigger('change', data);
	}

	addListener = this.eventsManager.addListener;
	removeListener = this.eventsManager.removeListener;
	trigger = this.eventsManager.trigger;

	fetch(): Promise<void | T> {
		const id = this.attributes.get('id');

		if (!id) {
			throw new Error('Cannot fetch without an id.');
		}

		return this.sync.fetch(id)
			.then((response: AxiosResponse): void => {
				this.set(response.data);
				this.eventsManager.trigger('fetched', response.data);
			});
	}

	save(): void {
		this.sync.save(this.attributes.getAll())
			.then((response: AxiosResponse<T>): void => {
				this.eventsManager.trigger('save', response.data);
			})
			.catch(() => {
				this.eventsManager.trigger('error');
			});
	}
}
