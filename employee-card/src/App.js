import './App.css';
import { useEffect } from 'react';
import { NavLink, Route, Routes, useLocation,  Navigate } from 'react-router-dom';
import Admin from './Pages/admin/Admin';
import ProtectedRoute from './Pages/ProtectedRoute/ProtectedRoute';
import ViewCards from './Pages/ViewCards';
import FormVcard from './Pages/FormVcard';
import Details from './Pages/Details';
import UserProtectedRoute from './Pages/Users/UserProtectedRoute';
import UserUpdate from './Pages/Users/UserUpdate';
import AdminLogin from './Pages/admin/AdminLogin';
import NotFound from './Pages/NotFound';
import UserLogin from './Pages/Users/UserLogin';
function App() {
    const location=useLocation()
    let userData = sessionStorage.getItem('userData');
    userData = JSON.parse(userData);
    console.log('user', userData)
    const userRole = userData !== null ? userData.userRole : null;
    const targetPage = location.pathname === '/' ? <NavLink to='/' replace={true}></NavLink> : <Admin />
 
    return (
        <div className="App">
              {/* {targetPage} */}
              <Admin />
               <div className='container' >
                    <Routes>
                        {/* admin */}
                        {
                        userRole ==='admin' ? 
                        <> 
                        <Route path="/admin/card/add" exact element={<ProtectedRoute> <FormVcard /> </ProtectedRoute>} />
                        <Route path="/admin/vcard" exact element={<ProtectedRoute> <ViewCards /> </ProtectedRoute>} />
                        <Route path='vcard/:id' exact element ={<ProtectedRoute>  <Details /> </ProtectedRoute>}/>
                        <Route path='/admin/edit/:id/:steps' element={<ProtectedRoute > <UserUpdate/> </ProtectedRoute>} />
                        </> :
                        (userRole ==='customer' ? 
                        <>
                        <Route path='/user/details/:id' exact element={<UserProtectedRoute> <Details /> </UserProtectedRoute>} />
                        <Route path='/user/edit/:id/:steps' exact  element={<UserProtectedRoute > <UserUpdate/> </UserProtectedRoute>} />
                        </> : 
                        <>
                        <Route path='/'
                        exact element={ userRole === null ? <UserLogin />: ( userRole ==='admin'? <ViewCards /> : <Details />)} 
                         />
                        <Route path='/user'
                        exact element={userRole === null ? <UserLogin />:<ViewCards /> } />
                        <Route path='/admin'
                        exact element={userRole === null ? <AdminLogin />: ( userRole ==='admin'? <ViewCards /> : <Details />)} />
                        </>)
                        }
                        {/* users */}
                        <Route path='/*' Component={NotFound } />
                    </Routes>
                </div>
        </div>
    );
}
export default App;
