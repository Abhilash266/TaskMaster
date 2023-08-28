import React from 'react';

import { Route, Routes } from "react-router";
import Main from './Frontend/components/main';











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
