import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import TopNavbar from "./Pages/TopNavbar"
import Home from './Pages/Home';
import { Container } from 'react-bootstrap';
import Details from './Pages/Details';
import Login from './Pages/admin/Login';
import SignUp from './Pages/admin/SignUp';
import ForgotPassword from './Pages/admin/ForgotPassword';
import ViewCards from './Pages/ViewCards';
// import BarcodeScanner from './Pages/BarcodeScanne';
function App() {
  return (
    <div className="App">
    <TopNavbar />
      <Container>
      <Routes>
        <Route path='/' element={<Login />} />
        
        {/* Parent Route */}
        <Route path='/login'>
          {/* Nested Route */}
          <Route path='view/:id' element={<Details />} />
        </Route>
        <Route path='/signup' element={<Home />} />
        <Route path='/signup/:id' element ={<Home />} />
        <Route path='/register' element={<SignUp />} />
        {/* Other routes */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route  path='/vcard' element={<ViewCards />}/>
      </Routes>
      </Container>
    </div>
  );
}
export default App;