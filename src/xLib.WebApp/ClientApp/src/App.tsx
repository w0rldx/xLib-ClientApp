/* eslint-disable import/no-named-as-default-member */
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import SiteLayout from './components/SiteLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import NoPage from './pages/NoPage';
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
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <SiteLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<Home />} />
                            <Route path="/user" element={<User />}>
                                <Route path=":userName" element={<User />} />
                            </Route>
                            <Route path="/error" element={<NoPage />} />
                            <Route path="*" element={<NoPage />} />
                        </Route>
                    </Routes>
                </AppProvider>
            </div>
        </>
    );
}

export default App;
