import './App.css';
import {Route, Routes} from 'react-router-dom';
import Main from './components/Main';
import CustomerPage from './components/CustomerPage';
import AdminPage from './components/AdminPage';
import Home from './components/Home';
import AdminHome from './components/AdminHome';
import AuthError from './components/AuthError';
import GetUsers from './components/GetUsers';
import GenerateReport from './components/GenerateReport';
import ViewOrders from './components/ViewOrders';
import ManageItems from './components/ManageItems';
import AddMenuItems from './components/AddMenuItems';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/customer" element={<CustomerPage />} />
                <Route path="/customer/home" element={<Home />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/home" element={<AdminHome />} />
                <Route path="/admin/users" element={<GetUsers />} />
                <Route path="/admin/report" element={<GenerateReport />} />
                <Route path="/admin/orders" element={<ViewOrders />} />
                <Route path="/admin/items" element={<ManageItems />} />
                <Route path="/admin/items/add" element={<AddMenuItems />} />
                <Route path="/authError" element={<AuthError />} />
            </Routes>
        </div>
    );
}

export default App;
