import { createContext, useState } from 'react';
import { Theme } from '../types';

type ThemesContext = {
	themes: Theme[];
	setThemes: React.Dispatch<React.SetStateAction<any>>;
};

export const ThemesContext = createContext<ThemesContext>({
	themes: [],
	setThemes: () => {},
});

export const ThemesProvider = ({ children }: { children: any }) => {
	const [themes, setThemes] = useState([]);
	const value: ThemesContext = { themes, setThemes };

	return (
		<ThemesContext.Provider value={value}>{children}</ThemesContext.Provider>
	);
};
