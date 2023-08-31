import React from 'react';

import { Route, Routes } from "react-router";
import Main from './Frontend/components/main';
import PageNotFound from './Frontend/components/404';
import Signup from './Frontend/components/Forms/signup';
import LoginForm from './Frontend/components/Forms/login';
import Home from './Frontend/components/home';












class App extends React.Component {
  render(){
    return (
      <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="signup" element={<Signup></Signup>}></Route>
          <Route path="login" element={<LoginForm></LoginForm>}></Route>
          <Route path="home" element={<Home></Home>}></Route>
        </Route>
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
      </>
    );
  }
}

export default App;
