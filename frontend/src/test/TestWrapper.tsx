import { ReactNode, FC, ReactElement } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { render, RenderOptions } from '@testing-library/react'

import { store } from '../app/store';
import { Provider } from 'react-redux';
import { ThemeWrapper } from '../AppStyles';
import {
    ThemeContextProvider,
    StepsContextProvider,
    ModalContextProvider,
    LastStepIdContextProvider,
} from "../utils";

const AllTheProviders: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Provider store={store}>
            <ThemeContextProvider>
                <StepsContextProvider>
                    <LastStepIdContextProvider>
                        <ModalContextProvider>
                            <ThemeWrapper>
                                {children}
                            </ThemeWrapper>
                        </ModalContextProvider>
                    </LastStepIdContextProvider>
                </StepsContextProvider>
            </ThemeContextProvider>
        </Provider>
    );
};

export const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'> & { route?: string, url?: string },
) => {
    const uiWithRouter = (
        <MemoryRouter initialEntries={[options?.url || "/"]}>
            <Routes>
                <Route path={options?.route || "/"} element={ui} />
            </Routes>
        </MemoryRouter>
    );

    return render(uiWithRouter, { wrapper: AllTheProviders, ...options })
};
