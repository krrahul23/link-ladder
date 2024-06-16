import { createContext, useState } from 'react';
import { Link } from '../types';

type LinksContext = {
	links: Link[];
	setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
};

export const initialLinksValue: Link = {
	id: '',
	title: '',
	url: '',
	createdAt: '',
	updatedAt: '',
	username: '',
};
export const LinksContext = createContext<LinksContext>({
	links: Array(initialLinksValue),
	setLinks: () => {},
});

export const LinksProvider = ({ children }: { children: any }) => {
	const [links, setLinks] = useState(Array(initialLinksValue));
	const value: LinksContext = { links, setLinks };

	return (
		<LinksContext.Provider value={value}>{children}</LinksContext.Provider>
	);
};
