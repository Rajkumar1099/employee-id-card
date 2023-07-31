import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
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
               <div className='container' >
                    <Routes>
                        <Route path='/' element={<Home />} />
                        {/* admin */}
                        <Route path="/admin/card/add" exact element={<ProtectedRoute> <FormVcard /> </ProtectedRoute>} />
                        <Route path="/admin/card/edit/:id" exact element={<ProtectedRoute> <FormVcard /> </ProtectedRoute>} />
                        <Route path="/admin/vcard" exact element={<ProtectedRoute> <ViewCards /> </ProtectedRoute>} />
                        <Route path='vcard/:id' exact element ={<ProtectedRoute>  <Details /> </ProtectedRoute>}/>
                        <Route path='/admin/edit/:id' element={<ProtectedRoute > <UserUpdate/> </ProtectedRoute>} />
                        {/* users */}
                        <Route path='/user/details/:id' element={<UserProtectedRoute> <Details /> </UserProtectedRoute>} />
                        <Route path='/user/edit/:id' element={<UserProtectedRoute > <UserUpdate/> </UserProtectedRoute>} />
                        <Route path='/card/:id' element={<CardDetails />}/>
                    </Routes>
                </div>
                
        </div>
    );
}
export default App;
