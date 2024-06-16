export type ButtonType = 'small' | 'medium' | 'large';

export type Theme = {
	index: string;
	title: string;
	background: string;
	details: string;
	linkBackground: string;
	linkText: string;
	isCurrentTheme: boolean;
};

export type ThemeNames =
	| 'default'
	| 'volcanic'
	| 'midnight'
	| 'slate_blue'
	| 'tangerine'
	| 'amethyst'
	| 'mint'
	| 'spring';

export type User = {
	id: string;
	username: string;
	email: string;
	password?: string;
};

export type Link = {
	id: string;
	title: string;
	url: string;
	visible?: boolean;
	createdAt: string;
	updatedAt: string;
	username: string;
};

export type Profile = {
	id: string;
	displayName: string;
	description: string;
	theme: string;
	image: string;
	username: string;
};
