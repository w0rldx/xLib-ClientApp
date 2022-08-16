import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import SiteLayout from './components/SiteLayout';
import EditUser from './pages/EditUser';
import Home from './pages/Home';
import Login from './pages/Login';
import Messages from './pages/Messages';
import NoPage from './pages/NoPage';
import Profile from './pages/Profile';
import Register from './pages/Register';
import User from './pages/User';
import AppProvider from './provider/AppProvider';
import './scss/Index.scss';

function App() {
    return (
        <>
            <div className="App">
                <AppProvider>
                    <Routes>
                        <Route path="register" element={<Register />} />
                        <Route path="login" element={<Login />} />
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <SiteLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<Home />} />
                            <Route path="user" element={<User />} />
                            <Route
                                path="user/:userName"
                                element={<Profile />}
                            />
                            <Route
                                path="user/messages"
                                element={<Messages />}
                            />
                            <Route path="edit" element={<EditUser />} />
                            <Route path="error" element={<NoPage />} />
                            <Route path="*" element={<NoPage />} />
                        </Route>
                    </Routes>
                </AppProvider>
            </div>
        </>
    );
}

export default App;
