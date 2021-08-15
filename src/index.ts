import { User } from './models/User';
import { UsersCollection } from "./models/UsersCollection";

const user = new User({ id: 1 });

user.addListener('fetched', (data) => console.log(data))

user.fetch().then(() => {
	console.log('User fetched.')
});

const users = new UsersCollection();

users.addListener('fetched', (data) => console.log(data))

users.fetch().then(() => {
	console.log('Users Collection fetched.')
});

/*
user.sync.fetch(1);

user.attributes.set({ name: 'Dima' });
user.attributes.get('id');

user.sync.save(user.attributes);*/
