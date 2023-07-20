import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
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
// import BarcodeScanner from './Pages/BarcodeScanne';
function App() {
    let userData = sessionStorage.getItem('userData');
    userData = JSON.parse(userData);
    const userRole = userData !== null ? userData.userRole : null;
   
    return (
        <div className="App">
               {
                userRole==='admin' ? <AdminDashboard />: ''
               }
              <Container>
              <Routes>
                    <Route path='/' element={<Home />} />
                    {/* admin */}
                    <Route path='/admin'  element={<Admin />} />
                    <Route path="/admin" exact element={<ProtectedRoute> <AdminDashboard /> </ProtectedRoute>} />
                    <Route path="/admin/card/add/:id" exact element={<ProtectedRoute> <FormVcard /> </ProtectedRoute>} />
                    <Route path="/admin/card/edit/:id" exact element={<ProtectedRoute> <FormVcard /> </ProtectedRoute>} />
                    <Route path="/admin/" exact element={<ProtectedRoute> <ViewCards /> </ProtectedRoute>} />
                    <Route path='vcard/:id' exact element ={<ProtectedRoute>  <Details /> </ProtectedRoute>}/>
                    {/* users */}
                    {/* 
                    <Route path='/customer' element={<User />} />
                    <Route path='/users/view/:id' element={ <ProtectedRoute > <ViewCard /> </ProtectedRoute> } />
                    <Route path='/users/edit/:id' element={ <ProtectedRoute > <CardForm /> </ProtectedRoute> } />
                        */}
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