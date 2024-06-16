// To be run only when initializing the project for the first time.

import { prisma } from './db';

async function main() {
	const user = await prisma.account.create({
		data: {
			username: 'demo',
			email: 'demo@demo.com',
			password: 'demo',
		},
	});
	const link = await prisma.link.create({
		data: {
			title: 'Demo',
			url: 'https://linkladder.vercel.app',
			username: user.username,
		},
	});
	const profile = await prisma.profile.create({
		data: {
			displayName: user.username,
			description: user.email,
			username: user.username,
		},
	});
	console.log(user, 'inserted');
	console.log(link, 'inserted');
	console.log(profile, 'inserted');
}

main();
