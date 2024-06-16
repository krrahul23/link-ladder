import { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Components
import Button, {
	BUTTON_COLORS,
	BUTTON_TYPES,
} from '../../components/button/Button';

// Data
import { UserContext } from '../../contexts/userContext';
import { validateEmail } from '../../utils/validation/email';

// Styles
import {
	AccountContainer,
	InnerAccountContainer,
	AccountTitle,
	Subheading,
	AccountBoxContainer,
	FlexContainer,
	InputLabel,
	InputStyles,
	DisabledInputStyles,
} from './Account.styles';

const Account = () => {
	const { user, setUser } = useContext(UserContext);
	const [email, setEmail] = useState(user.email);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setEmail(e.target.value);

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!validateEmail(email)) return toast.error('Please enter a valid email');
		try {
			toast.promise(
				axios.put(
					import.meta.env.VITE_BACKEND_URL + `/api/account/${user.id}`,
					{ email },
				),
				{
					loading: 'Updating your account...',
					success: (res) => {
						setUser({
							...user,
							email,
						});
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
		<AccountContainer>
			<InnerAccountContainer>
				<AccountTitle>Account</AccountTitle>
				<Subheading>My Account</Subheading>
				<AccountBoxContainer>
					<FlexContainer>
						<InputLabel>Username:</InputLabel>
						<DisabledInputStyles
							placeholder='Enter your username'
							value={user.username}
							disabled
						/>
					</FlexContainer>
					<FlexContainer>
						<InputLabel>Email:</InputLabel>
						<InputStyles
							placeholder='Enter your email'
							name='email'
							onChange={handleChange}
							value={email}
						/>
					</FlexContainer>
					<Button
						type={BUTTON_TYPES.small}
						color={BUTTON_COLORS.blue}
						onClick={handleSubmit}
					>
						Save Changes
					</Button>
				</AccountBoxContainer>
			</InnerAccountContainer>
		</AccountContainer>
	);
};

export default Account;
