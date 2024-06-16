import { Request, Response } from 'express';
import { prisma } from '../prisma/db';

class ProfileController {
	public async get(req: Request, res: Response) {
		if (req.method !== 'GET') {
			res.status(405).json({
				status: 'error',
				message: 'Only GET requests are allowed.',
			});
		}
		const user = await prisma.profile.findUnique({
			where: {
				username: req.params.username,
			},
		});
		res.status(200).json({
			status: 'success',
			message: 'User retrieved successfully.',
			payload: user,
		});
	}

	public async update(req: Request, res: Response) {
		if (req.method !== 'PUT') {
			res.status(405).json({
				status: 'error',
				message: 'Only PUT requests are allowed.',
			});
		}
		const { displayName, description } = req.body;
		await prisma.profile.update({
			where: {
				username: req.params.username,
			},
			data: {
				displayName,
				description,
			},
		});
		res.status(200).json({
			status: 'success',
			message: 'User updated successfully.',
		});
	}

	public async updateTheme(req: Request, res: Response) {
		if (req.method !== 'PUT') {
			res.status(405).json({
				status: 'error',
				message: 'Only PUT requests are allowed.',
			});
		}
		const { theme } = req.body;
		await prisma.profile.update({
			where: {
				username: req.params.username,
			},
			data: {
				theme,
			},
		});
		res.status(200).json({
			status: 'success',
			message: 'Theme updated successfully.',
		});
	}

	public async uploadImage(req: Request, res: Response) {
		if (req.method !== 'POST') {
			res.status(405).json({
				status: 'error',
				message: 'Only POST requests are allowed.',
			});
		}
		const { image } = req.body;
		await prisma.profile.update({
			where: {
				username: req.params.username,
			},
			data: {
				image,
			},
		});
		res.status(200).json({
			status: 'success',
			message: 'Image uploaded successfully.',
		});
	}
}

export default new ProfileController();
