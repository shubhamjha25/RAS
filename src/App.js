import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {Route, Routes} from 'react-router-dom';
import Main from './components/Main';
import CustomerPage from './components/CustomerPage';
import AdminPage from './components/AdminPage';
import CustomerHome from './components/CustomerHome';
import AdminHome from './components/AdminHome';
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
import AdminInvoices from './components/AdminInvoices';
import AdminGenBill from './components/AdminGenBill';
import PrivateRoute from './PrivateRoute';

function App() {
    return (
        <div className="App">
            <Routes>
                {/*PUBLIC ROUTES*/}
                <Route path="/" element={<Main />} />
                <Route path="/customer/login" element={<CustomerLogin />} />
                <Route path="/customer/register" element={<CustomerRegister />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/staff/login" element={<StaffLogin />} />

                {/*CUSTOMER PRIVATE ROUTES*/}
                <Route exact path="/customer/home" element={<PrivateRoute />}>
                    <Route exact path="/customer/home" element={<CustomerHome/>}/>
                </Route>

                <Route exact path="/customer/orders" element={<PrivateRoute />}>
                    <Route path="/customer/orders" element={<CustomerOrders />} />
                </Route>

                <Route exact path="/customer/cart" element={<PrivateRoute />}>
                    <Route path="/customer/cart" element={<CustomerCart />} />
                </Route>

                <Route exact path="/customer/orderSuccess" element={<PrivateRoute />}>
                    <Route path="/customer/orderSuccess" element={<OrderSuccess />} />
                </Route>
                
                {/*ADMIN PRIVATE ROUTES*/}
                <Route exact path="/admin/home" element={<PrivateRoute />}>
                    <Route path="/admin/home" element={<AdminHome />} />
                </Route>

                <Route exact path="/admin/users" element={<PrivateRoute />}>
                    <Route path="/admin/users" element={<GetUsers />} />
                </Route>

                <Route exact path="/admin/report" element={<PrivateRoute />}>
                    <Route path="/admin/report" element={<GenerateReport />} />
                </Route>

                <Route exact path="/admin/orders" element={<PrivateRoute />}>
                    <Route path="/admin/orders" element={<ViewOrders />} />
                </Route>

                <Route exact path="/admin/feedbacks" element={<PrivateRoute />}>
                    <Route path="/admin/feedbacks" element={<GetFeedbacks />} />
                </Route>

                <Route exact path="/admin/invoices" element={<PrivateRoute />}>
                    <Route path='/admin/invoices' element={<AdminInvoices />} />
                </Route>

                <Route exact path="/admin/invoices/:id" element={<PrivateRoute />}>
                    <Route path="/admin/invoices/:id" element={<AdminGenBill />} />
                </Route>

                <Route exact path="/admin/items" element={<PrivateRoute />}>
                    <Route path="/admin/items" element={<ManageItems />} />
                </Route>

                <Route exact path="/admin/items/add" element={<PrivateRoute />}>
                    <Route path="/admin/items/add" element={<AddMenuItems />} />
                </Route>

                <Route exact path="/admin/items/edit/:id" element={<PrivateRoute />}>
                    <Route path="/admin/items/edit/:id" element={<EditItem />} />
                </Route>

                {/*STAFF PRIVATE ROUTES*/}
                <Route exact path="/staff/chef/:id" element={<PrivateRoute />}>
                    <Route path="/staff/chef/:id" element={<Chef />} />
                </Route>

                <Route exact path="/staff/waiter/:id" element={<PrivateRoute />}>
                    <Route path="/staff/waiter/:id" element={<Waiter />} />
                </Route>

                <Route exact path="/staff/waiter/:id/bill/:billId" element={<PrivateRoute />}>
                    <Route path="/staff/waiter/:id/bill/:billId" element={<PrintBill />} />
                </Route>
    
                {/*404 Error Handler*/}
                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}

export default App;
