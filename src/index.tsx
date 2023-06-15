import { createRoot } from 'react-dom/client';
import { StoreProvider } from 'app/providers/StoreProvider';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import App from './app/App';
import 'app/styles/index.scss';
import './shared/config/i18n/i18n';

const container = document.getElementById('root');

if (!container) {
    throw new Error('Container root is not found. Can\'t launch the app');
}

const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
);
