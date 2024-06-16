export const validateRegister = (
	username: string,
	email: string,
	password: string,
) => {
	if (username.length !== 0 && email.length !== 0 && password.length !== 0) {
		return true;
	}
	return false;
};
