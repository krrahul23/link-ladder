import { createContext, useState } from 'react';
import { User } from '../types';

type UserContext = {
	user: User;
	setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const initialUserValue: User = {
	id: '',
	username: '',
	email: '',
};

export const UserContext = createContext<UserContext>({
	user: initialUserValue,
	setUser: () => {},
});

export const UserProvider = ({ children }: { children: any }) => {
	const [user, setUser] = useState(initialUserValue);
	const value: UserContext = { user, setUser };

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
