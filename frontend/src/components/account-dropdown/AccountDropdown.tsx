import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

// Components
import Button, { BUTTON_COLORS, BUTTON_TYPES } from '../button/Button';

// Data
import { UserContext, initialUserValue } from '../../contexts/userContext';
import { ProfileContext } from '../../contexts/profileContext';

// Styles
import {
	AccountDropdownCircle,
	AccountDropdownContainer,
	AccountEmail,
	AccountSettings,
	AccountSettingItem,
	AccountUsername,
	LinkStyles,
	AccountSettingLink,
	MobileShow,
} from './AccountDropdown.styles';

const AccountDropdown = ({ visible }: { visible: boolean }) => {
	const { profile } = useContext(ProfileContext);
	const { user, setUser } = useContext(UserContext);
	const handleLogout = () => {
		setUser(initialUserValue);
		toast.success('You have been logged out');
	};

	const [image, setImage] = useState(profile.image ? profile.image : '');

	useEffect(() => {
		setImage(profile.image);
	}, [profile.image]);

	return visible ? (
		<AccountDropdownContainer id='dropdown'>
			<AccountDropdownCircle src={image} />
			<AccountUsername>@{user.username}</AccountUsername>
			<AccountEmail>{user.email}</AccountEmail>
			<AccountSettings>
				<MobileShow>
					<AccountSettingItem to='/dashboard/links'>Links</AccountSettingItem>
					<AccountSettingItem to='/dashboard/themes'>Themes</AccountSettingItem>
					<AccountSettingItem to='/dashboard/settings'>
						Settings
					</AccountSettingItem>
				</MobileShow>
				<AccountSettingItem to='/account'>Account</AccountSettingItem>
				<AccountSettingLink
					rel='noreferrer'
					target='_blank'
					href={`${import.meta.env.VITE_FRONTEND_URL}/${profile.username}`}
				>
					View My Link Ladder
				</AccountSettingLink>
			</AccountSettings>
			<LinkStyles to='/login'>
				<Button
					onClick={handleLogout}
					type={BUTTON_TYPES.small}
					color={BUTTON_COLORS.red}
				>
					Logout
				</Button>
			</LinkStyles>
		</AccountDropdownContainer>
	) : (
		<></>
	);
};

export default AccountDropdown;
