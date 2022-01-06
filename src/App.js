import './App.css';
import {Route, Routes} from 'react-router-dom';
import Main from './components/Main';
import CustomerPage from './components/CustomerPage';
import AdminPage from './components/AdminPage';
import CustomerHome from './components/CustomerHome';
import AdminHome from './components/AdminHome';
import AuthError from './components/AuthError';
import GetUsers from './components/GetUsers';
import GenerateReport from './components/GenerateReport';
import ViewOrders from './components/ViewOrders';
import ManageItems from './components/ManageItems';
import AddMenuItems from './components/AddMenuItems';
import EditItem from './components/EditMenuItem';
import CustomerLogin from './components/CustomerLogin';
import CustomerRegister from './components/CustomerRegister';
import CustomerOrders from './components/CustomerOrders';
import CustomerCart from './components/CustomerCart';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/customer/login" element={<CustomerLogin />} />
                <Route path="/customer/register" element={<CustomerRegister />} />
                <Route path="/customer/home" element={<CustomerHome />} />
                <Route path="/customer/orders" element={<CustomerOrders />} />
                <Route path="/customer/cart" element={<CustomerCart />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/home" element={<AdminHome />} />
                <Route path="/admin/users" element={<GetUsers />} />
                <Route path="/admin/report" element={<GenerateReport />} />
                <Route path="/admin/orders" element={<ViewOrders />} />
                <Route path="/admin/items" element={<ManageItems />} />
                <Route path="/admin/items/add" element={<AddMenuItems />} />
                <Route path="/admin/items/edit/:id" element={<EditItem />} />
                <Route path="/authError" element={<AuthError />} />
            </Routes>
        </div>
    );
}

export default App;
