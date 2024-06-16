import { ButtonType } from '../../types';
import { LargeButton, MediumButton, SmallButton } from './Button.styles';

export const BUTTON_TYPES: Record<ButtonType, ButtonType> = {
	small: 'small',
	medium: 'medium',
	large: 'large',
};

export const BUTTON_COLORS = {
	blue: '#95CCFF',
	pink: '#EFC1FF',
	red: '#FFA4B4',
};

const getButtonType = (type: ButtonType) =>
	({
		[BUTTON_TYPES.small]: SmallButton,
		[BUTTON_TYPES.medium]: MediumButton,
		[BUTTON_TYPES.large]: LargeButton,
	}[type]);

type ButtonProps = {
	children: React.ReactNode;
	color: string;
	type: ButtonType;
} & React.HTMLAttributes<HTMLButtonElement>;

const Button = ({ children, color, type, ...otherProps }: ButtonProps) => {
	const ButtonContainer = getButtonType(type);
	return (
		<ButtonContainer color={color} {...otherProps}>
			{children}
		</ButtonContainer>
	);
};

export default Button;
