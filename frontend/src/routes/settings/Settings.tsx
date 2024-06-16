import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Components
import Button, {
	BUTTON_COLORS,
	BUTTON_TYPES,
} from '../../components/button/Button';

// Data
import { ProfileContext } from '../../contexts/profileContext';
import { refreshPreview } from '../../utils/helpers';

// Styles
import {
	Title,
	Subheading,
	ProfileContainer,
	FlexContainer,
	InnerFlexContainer,
	ProfileImage,
	DisplayUsernameInput,
	ProfileDescTextarea,
	UploadButton,
	SettingsContainer,
} from './Settings.styles';

const convertToBase64 = (file: File) =>
	new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onload = () => {
			resolve(fileReader.result);
		};
		fileReader.onerror = (error) => {
			reject(error);
		};
	});

const Settings = () => {
	const { profile, setProfile } = useContext(ProfileContext);
	const [image, setImage] = useState<string>(profile.image);

	useEffect(() => {
		console.log(profile);
		setImage(profile.image);
	}, [profile.image]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setProfile({
			...profile,
			[name]: value,
		});
	};

	const handleSave = async () => {
		try {
			await toast.promise(
				axios.put(
					import.meta.env.VITE_BACKEND_URL + `/api/profile/${profile.username}`,
					{
						displayName: profile.displayName,
						description: profile.description,
					},
				),
				{
					loading: 'Uploading your image...',
					success: (res) => {
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

	const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			console.log('asdf');
			if (e.target.files && e.target.files[0]) {
				const file = e.target.files[0];
				if (file.size > 50000) {
					return toast.error('Image must be less than 50kb');
				}
				const base64Image = (await convertToBase64(file)) as string;
				await toast.promise(
					axios.post(
						import.meta.env.VITE_BACKEND_URL +
							`/api/profile/image/${profile.username}`,
						{ image: base64Image },
					),
					{
						loading: 'Deleting your image...',
						success: (res) => {
							setProfile({
								...profile,
								image: base64Image,
							});
							refreshPreview();
							return res.data.message;
						},
						error: (err) => {
							return err.response.data.message;
						},
					},
				);
			}
		} catch {
			toast.error('Something went wrong.');
		}
	};

	const deleteImage = async () => {
		try {
			await toast.promise(
				axios.post(
					import.meta.env.VITE_BACKEND_URL + `/api/image/${profile.username}`,
					{
						image: profile.image,
					},
				),
				{
					loading: 'Deleting your image...',
					success: (res) => {
						setProfile({
							...profile,
							image: import.meta.env.VITE_BACKEND_URL + `/api/image/user.png`,
						});
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

	const openFileDialog = () => {
		document?.getElementById('file')?.click();
	};

	return (
		<SettingsContainer>
			<Title>Settings</Title>
			<Subheading>My Profile</Subheading>
			<ProfileContainer>
				<FlexContainer>
					<ProfileImage src={image} />
					<InnerFlexContainer>
						<Button
							type={BUTTON_TYPES.small}
							color={BUTTON_COLORS.blue}
							onClick={openFileDialog}
						>
							Upload An Image
						</Button>
						<UploadButton id='file' type='file' onChange={uploadImage} />
						<Button
							type={BUTTON_TYPES.small}
							color={BUTTON_COLORS.red}
							onClick={deleteImage}
						>
							Remove
						</Button>
					</InnerFlexContainer>
				</FlexContainer>
				<InnerFlexContainer>
					<DisplayUsernameInput
						type='text'
						placeholder='Display @username'
						name='displayName'
						value={profile.displayName}
						onChange={handleChange}
					/>
					<ProfileDescTextarea
						type='text'
						placeholder='Profile bio'
						name='description'
						value={profile.description}
						onChange={handleChange}
					/>
					<Button
						onClick={handleSave}
						type={BUTTON_TYPES.small}
						color={BUTTON_COLORS.blue}
					>
						Save Changes
					</Button>
				</InnerFlexContainer>
			</ProfileContainer>
		</SettingsContainer>
	);
};

export default Settings;
