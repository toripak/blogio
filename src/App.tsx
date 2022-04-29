import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import { Navbar } from './pages/components/Navbar';
import { Feed } from './pages/Feed/Feed';
import { Login } from './pages/Login/Login';
import { Signup } from './pages/Signup/Signup';
import { CreatePost } from './pages/CreatePost/CreatePost';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='createpost' element={<CreatePost />} />
          <Route path='*' element={
            <p>Uh-oh! Page not found...</p>
          } />
        </Routes>

    </BrowserRouter>
  );
}

export default App;
