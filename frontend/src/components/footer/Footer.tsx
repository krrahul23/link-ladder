// Styles
import {
	Container,
	ContainerDescription,
	ContainerLink,
	ContainerTitle,
	FooterContainer,
	LowerSection,
	Text,
	UpperSection,
} from './Footer.styles';

const Footer = () => {
	return (
		<FooterContainer>
			<UpperSection>
				<Container>
					<ContainerTitle>Link Ladder</ContainerTitle>
					<ContainerDescription>
						Link Ladder is a micro-landing page creator for anyone looking to
						list their links using a single site.
					</ContainerDescription>
				</Container>
				<Container>
					<ContainerTitle>Quick Links</ContainerTitle>
					<ContainerLink to='/'>Home</ContainerLink>
					<ContainerLink to='/register'>Register</ContainerLink>
					<ContainerLink to='/login'>Login</ContainerLink>
				</Container>
			</UpperSection>
			<LowerSection>
				<Text>
					Copyright © {new Date().getFullYear()} Link Ladder. All Rights
					Reserved
				</Text>
			</LowerSection>
		</FooterContainer>
	);
};

export default Footer;
