import { User, UserProps } from './User';
import { EventsManager } from './EventsManager';
import { Collection } from './Collection';

const rootUrl = 'http://localhost:3000/users';

export class UsersCollection extends Collection<User, UserProps>{
	constructor() {
		super(
			rootUrl,
			(data) => new User(data),
			new EventsManager<UserProps>(),
		);
	}
}
