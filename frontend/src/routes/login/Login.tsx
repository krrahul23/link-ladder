import { useContext, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Components
import Button, {
	BUTTON_COLORS,
	BUTTON_TYPES,
} from '../../components/button/Button';

// Contexts
import { UserContext } from '../../contexts/userContext';
import { ProfileContext } from '../../contexts/profileContext';

// Data
import { validateLogin } from '../../utils/validation/login';
import { validateEmail } from '../../utils/validation/email';
import { LinksContext } from '../../contexts/linksContext';

// Images
import LoginImage from '../../assets/auth-image.png';

// Styles
import {
	LoginContainer,
	SiteTitle,
	ImageHolder,
	Title,
	Subtitle,
	FormItem,
	FormInput,
	FormItemContainer,
	ButtonContainer,
	TextLink,
} from './Login.styles';

const Login = () => {
	const navigate = useNavigate();
	const { user, setUser } = useContext(UserContext);
	const { setProfile } = useContext(ProfileContext);
	const { setLinks } = useContext(LinksContext);
	const [loginUser, setLoginUser] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setLoginUser({ ...loginUser, [name]: value });
	};

	const handleLogin = () => {
		if (!validateLogin(loginUser.email, loginUser.password))
			return toast.error('Please fill in all the fields');
		if (!validateEmail(loginUser.email))
			return toast.error('Please enter a valid email');
		if (user) {
			navigate('/dashboard/links');
			toast.error('You are already logged in. Navigating you to the dashboard');
			return;
		}
		try {
			toast.promise(
				axios.post(
					import.meta.env.VITE_BACKEND_URL + '/api/account/login',
					loginUser,
				),
				{
					loading: 'Logging in to your account...',
					success: (res) => {
						console.log(res);
						setUser({
							...res.data.payload,
							image:
								import.meta.env.VITE_BACKEND_URL +
								`/api/image/${res.data.payload.image}`,
						});
						navigate('/dashboard/links');
						axios
							.get(
								import.meta.env.VITE_BACKEND_URL +
									`/api/profile/${res.data.payload.username}`,
							)
							.then((res) => {
								setProfile(res.data.payload);
							});
						axios
							.get(
								import.meta.env.VITE_BACKEND_URL +
									`/api/link/${res.data.payload.username}`,
							)
							.then((res) => {
								setLinks(res.data.payload);
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
		<>
			<LoginContainer>
				<SiteTitle to='/'>Link Ladder</SiteTitle>
				<Title>Login to your account</Title>
				<Subtitle>Enter your details to continue where you left</Subtitle>

				<FormItemContainer>
					<FormItem>Email:</FormItem>
					<FormInput
						type='email'
						placeholder='Enter your email'
						name='email'
						value={loginUser.email}
						onChange={handleChange}
					/>
				</FormItemContainer>

				<FormItemContainer>
					<FormItem>Password:</FormItem>
					<FormInput
						type='password'
						placeholder='Enter your password'
						name='password'
						value={loginUser.password}
						onChange={handleChange}
					/>
				</FormItemContainer>

				<ButtonContainer>
					<Button
						color={BUTTON_COLORS.blue}
						type={BUTTON_TYPES.medium}
						onClick={handleLogin}
					>
						Login
					</Button>
					<TextLink to='/register'>I do not have an account</TextLink>
				</ButtonContainer>

				<ImageHolder src={LoginImage} />
			</LoginContainer>
		</>
	);
};

export default Login;
