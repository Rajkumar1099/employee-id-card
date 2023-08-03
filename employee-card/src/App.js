import './App.css';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import { Container } from 'react-bootstrap';
import Admin from './Pages/admin/Admin';
import ProtectedRoute from './Pages/ProtectedRoute/ProtectedRoute';
import ViewCards from './Pages/ViewCards';
import FormVcard from './Pages/FormVcard';
import Details from './Pages/Details';
import UserProtectedRoute from './Pages/Users/UserProtectedRoute';
import UserUpdate from './Pages/Users/UserUpdate';
import CardDetails from './Pages/CardDetails';
import AdminLogin from './Pages/admin/AdminLogin';
import NotFound from './Pages/NotFound';
import ForgotPassword from './Pages/admin/ForgotPassword';
function App() {
    const location=useLocation()
    let userData = sessionStorage.getItem('userData');
    userData = JSON.parse(userData);
    console.log('user', userData)
    const userRole = userData !== null ? userData.userRole : null;
    const targetPage = location.pathname === '/' ? <NavLink to='/' replace={true}></NavLink> : <Admin />

    return (
        <div className="App">
              {targetPage}
               <div className='container' >
                    <Routes>
                        <Route path='/'
                        exact element={ userRole === null ? <AdminLogin />: ( userRole ==='admin'? <ViewCards /> : <Details />)} 
                         />
                        <Route path='/user'
                        exact element={userRole === null ? <AdminLogin />: ( userRole ==='admin'? <ViewCards /> : <Details />)} />
                        <Route path='/admin'
                        exact element={userRole === null ? <AdminLogin />: ( userRole ==='admin'? <ViewCards /> : <Details />)} />
                        {/* admin */}
                        <Route path="/admin/card/add" exact element={<ProtectedRoute> <FormVcard /> </ProtectedRoute>} />
                        <Route path="/admin/vcard" exact element={<ProtectedRoute> <ViewCards /> </ProtectedRoute>} />
                        <Route path='vcard/:id' exact element ={<ProtectedRoute>  <Details /> </ProtectedRoute>}/>
                        <Route path='/admin/edit/:id/:steps' element={<ProtectedRoute > <UserUpdate/> </ProtectedRoute>} />
                        {/* users */}
                        <Route path='/user/details/:id' exact element={<UserProtectedRoute> <Details /> </UserProtectedRoute>} />
                        <Route path='/user/edit/:id/:steps' exact  element={<UserProtectedRoute > <UserUpdate/> </UserProtectedRoute>} />
                        <Route path='*' Component={NotFound } />
                    </Routes>
                </div>
        </div>
    );
}
export default App;
