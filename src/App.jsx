// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./Pages/DefaultLayout";
import PostsList from "./components/PostsList";
import Home from "./Pages/Home";
import ShowPost from "./Pages/Posts/Show";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/posts" element={<PostsList />}></Route>
          <Route path="/posts/:slug" element={<ShowPost />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
