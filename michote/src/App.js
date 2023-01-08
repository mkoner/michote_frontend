
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
import TripPage from './pages/tripPage/tripPage';
import PartnerPage from './pages/partnerPage/partnerPage';
import CustomerPage from './pages/customerPage/customerPage';
import PartnerTripsPage from './pages/trips/trips';
import CreateTrip from './pages/createTrip/createTrip';
import CustomerBookings from './pages/customerBookings/customerBookings';
import BookingSuccess from './pages/bookingSuccess/bookingSuccess';
import About from './pages/about/about';
import Partners from './pages/partners/partners';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home/> } />
        <Route path='/login' element={<UserLogin/>} />
        <Route path='/partners/login' element={<PartnerLogin/>} />
        <Route path='/book/:id' element={<BookingPage/>} />
        <Route path='/booking/success' element={<BookingSuccess/>} />
        <Route path='/register' element={<UserRegister/>} />
        <Route path='/partners/register' element={<PartnerRegister/>} />
        <Route path='/partners/trips' element={<PartnerTripsPage/>} />
        <Route path='/search-trips/:from/:to' element={<TripsPage/>} />
        <Route path='/partners/profile' element={<PartnerPage/>} />
        <Route path='/routes/:id' element={<TripPage/>} />
        <Route path='/customers/profile' element={<CustomerPage/>} />
        <Route path='/create-trip' element={<CreateTrip/>} />
        <Route path='/customers/bookings' element={<CustomerBookings/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/partners' element={<Partners/>} />
      </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;