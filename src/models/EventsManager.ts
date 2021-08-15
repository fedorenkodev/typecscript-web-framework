import { IEventsManager } from './Model';

type Callback<T> = (data: T | []) => void;

export class EventsManager<T> implements IEventsManager<T> {
	private listeners: { [key: string]: Callback<T>[] } = {};

	addListener = (eventName: string, cb: Callback<T>): void => {
		const listenersList = this.listeners[eventName] || [];

		if (!listenersList.includes(cb)) {
			listenersList.push(cb);

			this.listeners[eventName] = listenersList;
		}
	}

	removeListener = (eventName: string, cb: Callback<T>): void => {
		if (this.listeners[eventName]) {
			let index = this.listeners[eventName].indexOf(cb);

			if (index !== -1) {
				this.listeners[eventName].splice(index, 1);
			}
		}
	}

	trigger = (eventName: string, data?: T | []): void => {
		if (this.listeners[eventName]) {
			for (let cb of this.listeners[eventName]) {
				cb(data ? data : []);
			}
		}
	}
}
