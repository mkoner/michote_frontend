import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './pages/home/home';
import BookingPage from './pages/booking/booking';

function App() {
  return (
    <div className="App">
      <Home/>
      <BookingPage/>
    </div>
  );
}

export default App;
