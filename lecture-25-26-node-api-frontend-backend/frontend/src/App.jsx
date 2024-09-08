import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import View from './Pages/View';
import Add from './Pages/Add';
import Edit from './Pages/Edit';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<View />} />
          <Route path='/add' element={<Add />} />
          <Route path='/edit' element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
