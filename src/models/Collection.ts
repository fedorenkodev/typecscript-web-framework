import { IEventsManager } from './Model';
import axios, { AxiosResponse } from 'axios';

export class Collection<T, K> {
	constructor(
		protected rootUrl: string,
		protected deserialize: (data: K) => T,
		protected eventsManager: IEventsManager<K>,
		protected models: T[] = [],
	) {}

	addListener = this.eventsManager.addListener;
	removeListener = this.eventsManager.removeListener;
	trigger = this.eventsManager.trigger;

	fetch(): Promise<void | T> {
		return axios.get(this.rootUrl)
			.then((response: AxiosResponse): void => {
				response.data.forEach((item: K) => {
					this.models.push(this.deserialize(item));
				});
			})
			.then(() => this.eventsManager.trigger('fetched', this.models));
	}
}
