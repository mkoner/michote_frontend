
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Header from './components/header/header';
import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
import Footer from './components/footer/footer';
import UserLogin from './pages/userLogin/userLogin';
import BookingPage from './pages/booking/booking';
import UserRegister from './pages/userRegister/userRegister';
import PartnerLogin from './pages/patnerLogin/partnerLogin';
import PartnerRegister from './pages/partnerRegister/partnerRegister';
import Home from './pages/home/home';
import TripsPage from './pages/tripsPage/tripsPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home/> } />
        <Route path='/login' element={<UserLogin/>} />
        <Route path='/partners/login' element={<PartnerLogin/>} />
        <Route path='/book' element={<BookingPage/>} />
        <Route path='/register' element={<UserRegister/>} />
        <Route path='/partners/register' element={<PartnerRegister/>} />
        <Route path='/trips' element={<TripsPage/>} />
      </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;