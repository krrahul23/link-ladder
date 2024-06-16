import { createContext, useState } from 'react';
import { Profile } from '../types';

type ProfileContext = {
	profile: Profile;
	setProfile: React.Dispatch<React.SetStateAction<Profile>>;
};

export const initialProfileValue: Profile = {
	id: '',
	displayName: '',
	description: '',
	image: '',
	theme: '',
	username: '',
};

export const ProfileContext = createContext<ProfileContext>({
	profile: initialProfileValue,
	setProfile: () => {},
});

export const ProfileProvider = ({ children }: { children: any }) => {
	const [profile, setProfile] = useState(initialProfileValue);
	const value: ProfileContext = { profile, setProfile };
	console.log(setProfile);

	return (
		<ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
	);
};
