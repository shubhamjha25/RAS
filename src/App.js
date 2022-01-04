import './App.css';
import {Route, Routes} from 'react-router-dom';
import Main from './components/Main';
import CustomerPage from './components/CustomerPage';
import AdminPage from './components/AdminPage';
import Home from './components/Home';
import AdminHome from './components/AdminHome.';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/customer" element={<CustomerPage />} />
                <Route path="/customer/home" element={<Home />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/home" element={<AdminHome />} />
            </Routes>
        </div>
    );
}

export default App;
