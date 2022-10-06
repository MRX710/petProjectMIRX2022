import React,  { Suspense} from "react";
import {Link, Route, Routes} from "react-router-dom";
import "./styles/index.scss"
import {classNames} from "shared/lib/classNames/classNames";
import { useTheme } from "./providers/ThemeProvider";
import {AboutPage} from "pages/AboutPage";
import {MainPage} from "pages/MainPage";



const App = () => {


   const {theme, toggleTheme} = useTheme();

   return (
      <div className={classNames('app', {}, [theme])}>
         <button onClick={toggleTheme}/>
         <Link to={'/'}>Главная</Link>
         <Link to={'/about'}>О нас</Link>
         <Suspense fallback={<div>Loading...</div>}>
            <Routes>
               <Route path={'/about'} element={<AboutPage />} />
               <Route path={'/'} element={<MainPage />} />
            </Routes>
         </Suspense>
      </div>
   )
}

export default App