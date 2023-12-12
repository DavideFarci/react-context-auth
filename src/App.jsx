import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./Pages/DefaultLayout";
import PostsList from "./components/PostsList";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ShowPost from "./Pages/Posts/Show";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/posts" element={<PostsList />}></Route>
            <Route path="/posts/:slug" element={<ShowPost />}></Route>

            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
