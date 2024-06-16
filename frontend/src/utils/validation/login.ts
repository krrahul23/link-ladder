export const validateLogin = (email: string, password: string) => {
	if (email.length !== 0 && password.length !== 0) {
		return true;
	}
	return false;
};
