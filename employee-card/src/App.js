    import './App.css';
    import { NavLink, Route, Routes, useLocation,  Navigate } from 'react-router-dom';
    import ProtectedRoute from './Pages/ProtectedRoute/ProtectedRoute';
    import ViewCards from './Pages/ViewCards';
    import FormVcard from './Pages/FormVcard';
    import Details from './Pages/Details';
    import UserProtectedRoute from './Pages/Users/UserProtectedRoute';
    import UserUpdate from './Pages/Users/UserUpdate';
    import AdminLogin from './Pages/admin/AdminLogin';
    import NotFound from './Pages/NotFound';
    import UserLogin from './Pages/Users/UserLogin';
    import AdminDashboard from './Pages/admin/AdminDashboard';
    import UserDashboard from './Pages/Users/UserDashboard';
import CustomerVCard from './Pages/CustomerVCard';
    function App() {
        const location=useLocation()
        let userData = sessionStorage.getItem('userData');
        userData = JSON.parse(userData);
        console.log('user', userData)
        const userRole = userData !== null ? userData.userRole : null;
        // const targetPage = location.pathname === '/' ? <NavLink to='/' replace={true}></NavLink> : <Admin />
        return (
            <div className="App">
                {
                    userRole ==='admin' ? <AdminDashboard />:( userRole ==='customer' ?  <UserDashboard /> :'')
                }
                <div className='container' >
                    <Routes>
                        {/* admin url*/}
                        {
                        userRole ==='admin' && 
                        <>
                        <Route path="/admin/card/add" exact element={<ProtectedRoute> <FormVcard /> </ProtectedRoute>} />
                        <Route path="/admin/vcard" exact element={<ProtectedRoute> <ViewCards /> </ProtectedRoute>} />
                        <Route path='vcard/:id' exact element ={<ProtectedRoute>  <Details /> </ProtectedRoute>}/>
                        <Route path='/' element={<Navigate to='/admin/vcard'/>} />
                        <Route path='/admin' element={<Navigate to='/admin/vcard'/>} />
                        <Route path='/admin/edit/:id/:steps' element={<ProtectedRoute > <UserUpdate/> </ProtectedRoute>} />
                        <Route path='/*' element={<NotFound  />} />
                        </> }
                        {/* customer url */}
                        { userRole ==='customer' &&
                        <>
                        <Route path='/user/details/:id' exact element={<UserProtectedRoute> <Details /> </UserProtectedRoute>} />
                        <Route path='/' element={<Navigate to={`/user/details/${userData.userId}`}/> }/>
                        <Route path='/user' element={<Navigate to={`/user/details/${userData.userId}`}/> }/>
                        <Route path='/user/edit/:id/:steps' exact  element={<UserProtectedRoute > <UserUpdate/> </UserProtectedRoute>} />
                        </>}
                        {/* Public url*/}
                        <Route path='/' exact element={  <UserLogin />} />
                        <Route path='/user' exact element={<UserLogin /> } />
                        <Route path='/admin' exact element={ <AdminLogin />} />
                        <Route path='/card/:id' exact element={ <CustomerVCard />} />
                        <Route path='/*' element={<NotFound />} />
                    </Routes>
                    </div>
            </div>
        );
    }
    export default App;
