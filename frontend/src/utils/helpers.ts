export const refreshPreview = () => {
	if (document !== null) {
		const iframe = document.getElementById('preview') as HTMLIFrameElement;
		const contentWindow = iframe.contentWindow as Window;
		contentWindow.location.reload()!;
	}
};
