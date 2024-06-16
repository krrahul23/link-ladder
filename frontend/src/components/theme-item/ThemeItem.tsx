import { useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Data
import { ThemesContext } from '../../contexts/themesContext';
import { refreshPreview } from '../../utils/helpers';

// Styles
import {
	ThemeOuterContainer,
	ThemeCardContainer,
	Card,
} from './ThemeItem.styles';
import { Theme } from '../../types';
import { ProfileContext } from '../../contexts/profileContext';

const ThemeCard = ({ theme }: { theme: Theme }) => {
	const { profile, setProfile } = useContext(ProfileContext);
	const { themes, setThemes } = useContext(ThemesContext);

	const handleUpdate = () => {
		try {
			toast.promise(
				axios.put(
					import.meta.env.VITE_BACKEND_URL +
						`/api/profile/theme/${profile.username}`,
					{
						theme: theme.index,
					},
				),
				{
					loading: 'Updating theme...',
					success: (res) => {
						setProfile({ ...profile, theme: theme.index });
						setThemes(
							themes.map((theme) => {
								if (theme.index === profile.theme) {
									return { ...theme, isCurrentTheme: true };
								} else {
									return { ...theme, isCurrentTheme: false };
								}
							}),
						);
						refreshPreview();
						return res.data.message;
					},
					error: (err) => {
						return err.response.data.message;
					},
				},
			);
		} catch {
			toast.error('Something went wrong.');
		}
	};

	return (
		<ThemeOuterContainer>
			<ThemeCardContainer
				onClick={handleUpdate}
				theme={theme}
				isCurrentTheme={theme.isCurrentTheme}
			>
				<Card theme={theme} />
				<Card theme={theme} />
				<Card theme={theme} />
			</ThemeCardContainer>
			{theme.title}
		</ThemeOuterContainer>
	);
};

export default ThemeCard;
