import { UserList } from './views/UserList';
import { Collection } from './models/Collection';
import { UserProps, User } from './models/User';
import { EventsManager } from "./models/EventsManager";

const users = new Collection(
	'http://localhost:3000/users',
	(json: UserProps) => {
		return new User(json);
	},
	new EventsManager()
);

users.addListener('fetched', () => {
	const root = document.getElementById('root');


	if (root) {
		new UserList(root, users).render();
	}
});
