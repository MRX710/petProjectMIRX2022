import React, { memo, Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { userActions } from 'entities/User';
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";

function App() {
    /* eslint-disable-next-line no-debugger */
    debugger;
    const dispatch = useAppDispatch();
    dispatch(userActions.initializeAuthData());

    return (
        <div className={classNames('app', {}, [])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
}

export default memo(App);
