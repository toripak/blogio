import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { Feed } from './pages/Feed/Feed';
import { Login } from './pages/Login/Login';
import { Signup } from './pages/Signup/Signup';
import { CreatePost } from './pages/CreatePost/CreatePost';

import { useAuthContext } from './hooks/useAuthContext';
import { UserProfile } from './pages/UserProfile/UserProfile';
import { PostSummary } from './pages/PostSummary/PostSummary';

const App = () => {
  const { authenticated, user } = useAuthContext();

  return (
    <div className='App text-gray-800'>
      {authenticated && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Feed />} />
            <Route path='login' element={!user ? <Login /> : <Navigate to="/" replace={true} />} />
            <Route path='signup' element={!user ? <Signup /> : <Navigate to="/" replace={true} />} />
            <Route path='createpost' element={<CreatePost />} />
            <Route path={`user-profile/:uid`} element={<UserProfile />} />
            <Route path={`posts/:id`} element={<PostSummary />} />
            {/* <Route path='*' element={
            <p>Uh-oh! Page not found...</p>
          } /> */}
          </Routes>

        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
