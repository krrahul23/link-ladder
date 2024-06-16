import { useContext, useEffect } from 'react';

// Components
import ThemeItem from '../../components/theme-item/ThemeItem';

// Styles
import { ThemesContext } from '../../contexts/themesContext';
import { ProfileContext } from '../../contexts/profileContext';
import { USER_THEMES } from '../../data/userThemes';

// Styles
import {
	FlexContainer,
	ThemesTitle,
	ThemesList,
	ThemesContainer,
} from './Themes.styles';
import { Theme } from '../../types';

const Themes = () => {
	const { themes, setThemes } = useContext(ThemesContext);
	const { profile } = useContext(ProfileContext);
	useEffect(() => {
		setThemes(
			Object.values(USER_THEMES).map((theme) => {
				if (theme.index === profile.theme) {
					return { ...theme, isCurrentTheme: true };
				} else {
					return { ...theme, isCurrentTheme: false };
				}
			}),
		);
	}, [setThemes, profile.theme]);
	return (
		<ThemesContainer>
			<FlexContainer>
				<ThemesTitle>My Themes</ThemesTitle>
			</FlexContainer>
			<ThemesList>
				{themes.map((theme: Theme) => (
					<ThemeItem key={theme.title} theme={theme} />
				))}
			</ThemesList>
		</ThemesContainer>
	);
};

export default Themes;
