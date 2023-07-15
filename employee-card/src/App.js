import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import TopNavbar from "./Pages/TopNavbar"
import Home from './Pages/Home';
import { Container } from 'react-bootstrap';
import Details from './Pages/Details';
import Login from './Pages/admin/Login';
import SignUp from './Pages/admin/SignUp';
// import BarcodeScanner from './Pages/BarcodeScanne';
function App() {
  return (
    <div className="App">
    <TopNavbar />
      <Container>
        <Routes>
              <Route path='/' element={ <Home />} />
              <Route path='/details' element={<Details />} />
              <Route path='/login' element={<Login />} />
              {/* <Route path='/scanner' element ={<BarcodeScanner />} /> */}
        </Routes>
      </Container>
    </div>
  );
}
export default App;