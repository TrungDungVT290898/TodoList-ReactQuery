import React from 'react';
import logo from './logo.svg';

import './App.css';
import { Routes, Route, NavLink, Outlet } from "react-router-dom";
import HomePage from './features/heroes/pages/HomePage';
import SuperHeroesPage from './features/heroes/pages/SuperHeroesPage';
import RQSuperHeroes from './features/heroes/pages/RQSuperHeroes';
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/query-core';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import FriendPage from './features/heroes/pages/Friend';
import DetailHeroPage from './features/heroes/pages/DetailHeroPage';
import InifiniteQueriesPage from './features/heroes/pages/InifiniteQueriesPage';


const styleNavlink = {
  paddingRight: 10,
  paddingLeft: 10,
  textDecoration: "none",
  color: "black"
}
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>

      <nav style={
        {
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          height: 50,
          backgroundColor: "yellow"
        }
      }>
        <NavLink style={styleNavlink} to="/">HOME PAGE</NavLink>
        <NavLink style={styleNavlink} to="/superheroes">SUPER HEROES PAGE</NavLink>
        <NavLink style={styleNavlink} to="/rqsuperheroes">RQ HEROES PAGE</NavLink>
        <NavLink style={styleNavlink} to="/friend">FRIENDS PAGE</NavLink>
        <NavLink style={styleNavlink} to="/colors">COLORS PAGE</NavLink>
      </nav>
      <Routes>
        <Route path='/' element={<HomePage />}>

        </Route>
        <Route path='/superheroes' element={<SuperHeroesPage />} />
        <Route path='/rqsuperheroes' element={<RQSuperHeroes />} >
          <Route path=':id' element={<DetailHeroPage />} />
        </Route>
        <Route path='/friend' element={<FriendPage />} />
        <Route path='/colors' element={<InifiniteQueriesPage />} />
      </Routes>
      <Outlet />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>

  );
}

export default App;
