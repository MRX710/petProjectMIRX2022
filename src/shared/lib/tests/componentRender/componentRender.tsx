import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18ForTests from 'shared/config/i18n/i18ForTests';
import { StateScheme, StoreProvider } from 'app/providers/StoreProvider';

export interface componentRenderOptions {
   route?: string;
   initialState?: DeepPartial<StateScheme>
}

export function componentRender(component: ReactNode, options: componentRenderOptions = {}) {
    const {
        route = '/',
        initialState,
    } = options;

    return render(
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider initialState={initialState as StateScheme}>
                <I18nextProvider i18n={i18ForTests}>
                    {component}
                </I18nextProvider>
            </StoreProvider>
        </MemoryRouter>,
    );
}
