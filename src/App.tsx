import React, { Suspense } from "react";
import {Link, Route, Routes} from "react-router-dom";
import "./index.scss"
import {AboutPageLazy} from "./pages/AboutPage/AboutPageLazy";
import {MainPageLazy} from "./pages/MainPage/MainPageLazy";


const App = () => {

  return (
    <div className="app">
       <Link to={'/'}>Главная</Link>
       <Link to={'/about'}>О нас</Link>
       <Suspense fallback={<div>Loading...</div>}>
         <Routes>
           <Route path={'/about'} element={<AboutPageLazy />} />
           <Route path={'/'} element={<MainPageLazy />} />
         </Routes>
       </Suspense>
    </div>
  )
}

export default App