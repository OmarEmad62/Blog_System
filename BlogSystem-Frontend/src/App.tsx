import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './components/Layout'
import IndexPage from "./components/IndexPage"
import { Route, Routes } from 'react-router-dom'
import CreatePosts from './components/CreatePosts'
import PostPage from './components/PostPage'
import EditPost from './components/EditPost'
import Reorder from './components/Reorder'

function App() {
  return (
  
    <Routes>
      <Route path='/'element={<Layout/>}>
        <Route index element={ 
          <IndexPage/>
        }/>
        <Route path='/create' element={<CreatePosts/>}/>
        <Route path="/post/:id" element={<PostPage/>}/>
        <Route path="/edit/:id" element={<EditPost/>}/>
        <Route path='/Reorder' element={<Reorder/>}/>
      </Route>
    </Routes>

  );
}

export default App
