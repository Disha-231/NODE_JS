import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import View from '../src/Pages/view';
import Add from './Pages/add';
function App() {

  return (
    <>
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<View />} />
        <Route path='/add' element={<Add/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
