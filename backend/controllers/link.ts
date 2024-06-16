import { Request, Response } from 'express';
import { prisma } from '../prisma/db';

class LinkController {
	public async create(req: Request, res: Response) {
		if (req.method !== 'POST') {
			res.status(405).json({
				status: 'error',
				message: 'Only POST requests are allowed.',
			});
		}
		const { url, title } = req.body;
		const createdLink = await prisma.link.create({
			data: {
				url,
				title,
				username: req.params.username,
			},
		});
		res.status(200).json({
			status: 'success',
			message: 'Link created successfully.',
			payload: createdLink,
		});
	}

	public async get(req: Request, res: Response) {
		if (req.method !== 'GET') {
			res.status(405).json({
				status: 'error',
				message: 'Only GET requests are allowed.',
			});
		}
		const links = await prisma.link.findMany({
			where: {
				username: req.params.username,
			},
			orderBy: {
				updatedAt: 'desc',
			},
		});
		res.status(200).json({
			status: 'success',
			message: 'Links retrieved successfully.',
			payload: links,
		});
	}

	public async update(req: Request, res: Response) {
		if (req.method !== 'PUT') {
			res.status(405).json({
				status: 'error',
				message: 'Only PUT requests are allowed.',
			});
		}
		const { url, title, visible } = req.body;
		await prisma.link.update({
			where: {
				id: req.params.id,
			},
			data: {
				url,
				title,
				visible,
			},
		});
		res.status(200).json({
			status: 'success',
			message: 'Link updated successfully.',
		});
	}

	public async delete(req: Request, res: Response) {
		if (req.method !== 'DELETE') {
			res.status(405).json({
				status: 'error',
				message: 'Only DELETE requests are allowed.',
			});
		}
		await prisma.link.delete({
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json({
			status: 'success',
			message: 'Link deleted successfully.',
		});
	}
}

export default new LinkController();
