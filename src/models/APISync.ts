import axios, { AxiosPromise } from 'axios';

import { ISync, IHasId } from './Model';

export class APISync<T extends IHasId> implements ISync<T> {
	constructor(public rootUrl: string) {}

	fetch = (id: number): AxiosPromise => {
		return axios.get(`${this.rootUrl}/${id}`)
	}

	save = (data: T): AxiosPromise => {
		const { id } = data;

		if (id) {
			return axios.put(`${this.rootUrl}/${id}`, data)
		} else {
			return axios.post(`${this.rootUrl}`, data)
		}
	}
}
