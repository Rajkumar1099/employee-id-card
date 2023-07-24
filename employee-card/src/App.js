import logo from './logo.svg';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import TopNavbar from "./Pages/TopNavbar";
import Home from './Pages/Home';
import { Container } from 'react-bootstrap';
import Admin from './Pages/admin/Admin';
import AdminDashboard from './Pages/admin/AdminDashboard';
import ProtectedRoute from './Pages/ProtectedRoute/ProtectedRoute';
import ViewCards from './Pages/ViewCards';
import FormVcard from './Pages/FormVcard';
import Details from './Pages/Details';
import { useEffect, useState } from 'react';
import UserProtectedRoute from './Pages/Users/UserProtectedRoute';
import UserUpdate from './Pages/Users/UserUpdate';
// import BarcodeScanner from './Pages/BarcodeScanne';
function App() {
    const location=useLocation()
    let userData = sessionStorage.getItem('userData');
    userData = JSON.parse(userData);
    const userRole = userData !== null ? userData.userRole : null;

    return (
        <div className="App">
               {
                location.pathname !=='/'? <Admin /> :''
               }
              <Container>
              <Routes>
                    <Route path='/' element={<Home />} />
                    {/* admin */}
                    {/* <Route path='/admin'  element={<Admin />} /> */}
                    {/* <Route path="admin/card/add" exact element={ <FormVcard /> } /> */}
                    {/* <Route path="/admin/" exact element={<ProtectedRoute> <AdminDashboard /> </ProtectedRoute>} /> */}
                    <Route path="/admin/card/add" exact element={<ProtectedRoute> <FormVcard /> </ProtectedRoute>} />
                    <Route path="/admin/card/edit/:id" exact element={<ProtectedRoute> <FormVcard /> </ProtectedRoute>} />
                    <Route path="/admin/vcard" exact element={<ProtectedRoute> <ViewCards /> </ProtectedRoute>} />
                    <Route path='vcard/:id' exact element ={<ProtectedRoute>  <Details /> </ProtectedRoute>}/>
                    {/* users */}
                    {/* <Route path='/user' element={<Admin />} /> */}
                    <Route path='/user/details/:id' element={<UserProtectedRoute> <Details /> </UserProtectedRoute>} />
                    <Route path='/user/edit/:id' element={<UserProtectedRoute > <UserUpdate/> </UserProtectedRoute>} />
                </Routes>
              </Container>
        </div>
    );
}
export default App;


{
/* <Routes>
<Route path='/' element={<Login />} />

<Route path='/login'>

  <Route path='view/:id' element={<Details />} />
</Route>
<Route path='/signup' element={<Home />} />
<Route path='/signup/:id' element ={<Home />} />
<Route path='/register' element={<SignUp />} />

<Route path="/forgot-password" element={<ForgotPassword />} />
<Route  path='/vcard' element={<ViewCards />}/>
</Routes> 
*/
}

// <Routes>
// <Route path='/' element={<Home />} />
// <Route path='/admin' element={<Login />} />
// <Route path='/login' element={<Login />} />
// <Route path='vcard/:id' 
//     element={
//         <ProtectedRoute>
//             <Details />
//         </ProtectedRoute>
//     } />

// </Routes>