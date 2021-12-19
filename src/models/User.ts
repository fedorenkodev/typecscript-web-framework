import { EventsManager } from './EventsManager';
import { APISync } from './APISync';
import { Attributes } from './Attributes';
import { Model } from './Model';

export interface UserProps {
	id?: number;
	name?: string;
	age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User extends Model<UserProps>{
	public constructor(attributes: UserProps) {
		super(
			new EventsManager<UserProps>(),
			new Attributes<UserProps>(attributes),
			new APISync<UserProps>(rootUrl),
		);
	}

	setRandomAge() {
		const age = Math.round(Math.random() * 100);

		this.set({ age })
	}
}
