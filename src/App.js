import React from 'react';

import { Route, Routes } from "react-router";
import Main from './Frontend/components/main';
import Signup from './Frontend/components/Forms/signup';
import LoginForm from './Frontend/components/Forms/login';
import App1 from './Frontend/components/tester';










class App extends React.Component {
  render(){
    return (
      <>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route component={"ErrorPage"} />
      </Routes>
      </>
    );
  }
}

export default App;
