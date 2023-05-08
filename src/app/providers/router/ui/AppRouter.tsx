import React, { memo, Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader';
import { useSelector } from "react-redux";
import { getUserAuthData } from "entities/User";

const AppRouter = () => {
    const isAuth = useSelector(getUserAuthData);

    const routes = useMemo(() => {
        if (isAuth) {
            return Object.values(routeConfig);
        }
        return Object.values(routeConfig).filter((route) => {
            if (!route?.authOnly) {
                return true;
            }
            return false;
        });
    }, [isAuth]);

    return (
        <Routes>
            {routes.map(({ element, path }) => (
                <Route
                    key={path}
                    path={path}
                    element={(
                        <Suspense fallback={<PageLoader />}>
                            <div className="page-wrapper">
                                {element}
                            </div>
                        </Suspense>
                    )}
                />
            ))}
        </Routes>
    );
};

export default memo(AppRouter);
