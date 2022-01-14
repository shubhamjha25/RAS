import './App.css';
import 'react-toastify/dist/ReactToastify.css';
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
import Payment from './components/Payment';
import OrderSuccess from './components/OrderSuccess';
import GetFeedbacks from './components/GetFeedbacks';
import Page404 from './components/Page404';
import StaffLogin from './components/StaffLogin';
import Chef from './components/Chef';
import Waiter from './components/Waiter';
import PrintBill from './components/PrintBill';

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
                <Route path="/customer/orderSuccess" element={<OrderSuccess />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/home" element={<AdminHome />} />
                <Route path="/admin/users" element={<GetUsers />} />
                <Route path="/admin/report" element={<GenerateReport />} />
                <Route path="/admin/orders" element={<ViewOrders />} />
                <Route path="/admin/feedbacks" element={<GetFeedbacks />} />
                <Route path="/admin/items" element={<ManageItems />} />
                <Route path="/admin/items/add" element={<AddMenuItems />} />
                <Route path="/admin/items/edit/:id" element={<EditItem />} />
                <Route path="/staff/login" element={<StaffLogin />} />
                <Route path="/staff/chef/:id" element={<Chef />} />
                <Route path="/staff/waiter/:id" element={<Waiter />} />
                <Route path="/staff/waiter/:id/bill/:billId" element={<PrintBill />} />
                <Route path="/authError" element={<AuthError />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}

export default App;
