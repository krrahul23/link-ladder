import { Request, Response } from 'express';
import { prisma } from '../prisma/db';

class AccountController {
	public async register(req: Request, res: Response) {
		if (req.method !== 'POST') {
			res.status(405).json({
				status: 'error',
				message: 'Only POST requests are allowed.',
			});
		}

		const { username, email, password } = req.body;

		const existingEmail = await prisma.account.findUnique({
			where: {
				email,
			},
		});
		if (existingEmail) {
			res.status(400).json({
				status: 'error',
				message: 'Email already in use.',
			});
			return;
		}
		const existingUsername = await prisma.account.findUnique({
			where: {
				username,
			},
		});
		if (existingUsername) {
			res.status(400).json({
				status: 'error',
				message: 'Username already in use.',
			});
			return;
		}

		const account = await prisma.account.create({
			data: {
				username,
				email,
				password,
			},
		});
		await prisma.profile.create({
			data: {
				displayName: username,
				description: email,
				username: account.username,
			},
		});

		res.status(200).json({
			status: 'success',
			message: 'User created successfully.',
		});
	}

	public async login(req: Request, res: Response) {
		if (req.method !== 'POST') {
			res.status(405).json({
				status: 'error',
				message: 'Only POST requests are allowed.',
			});
		}
		const { email, password } = req.body;

		const existingUser = await prisma.account.findUnique({
			where: {
				email,
			},
		});
		if (!existingUser) {
			res.status(400).json({
				status: 'error',
				message: 'User not found.',
			});
			return;
		}

		if (existingUser.password !== password) {
			res.status(400).json({
				status: 'error',
				message: 'Incorrect password.',
			});
		}

		const user = await prisma.account.findUnique({
			where: {
				email,
			},
			select: {
				id: true,
				username: true,
				email: true,
			},
		});

		res.status(200).json({
			status: 'success',
			message: 'User logged in successfully.',
			payload: {
				...user,
			},
		});
	}

	public async update(req: Request, res: Response) {
		if (req.method !== 'PUT') {
			res.status(405).json({
				status: 'error',
				message: 'Only PUT requests are allowed.',
			});
		}
		const { username, email } = req.body;
		await prisma.account.update({
			where: {
				id: req.params.id,
			},
			data: {
				username,
				email,
			},
		});
		res.status(200).json({
			status: 'success',
			message: 'User updated successfully.',
		});
	}

	public async delete(req: Request, res: Response) {
		if (req.method !== 'DELETE') {
			res.status(405).json({
				status: 'error',
				message: 'Only DELETE requests are allowed.',
			});
		}
		await prisma.account.delete({
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json({
			status: 'success',
			message: 'User deleted successfully.',
		});
	}
}

export default new AccountController();
