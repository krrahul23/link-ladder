import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

// Context Providers
import { UserProvider } from './contexts/userContext';
import { LinksProvider } from './contexts/linksContext';
import { ThemesProvider } from './contexts/themesContext';
import { ProfileProvider } from './contexts/profileContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<UserProvider>
				<ProfileProvider>
					<ThemesProvider>
						<LinksProvider>
							<App />
						</LinksProvider>
					</ThemesProvider>
				</ProfileProvider>
			</UserProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
