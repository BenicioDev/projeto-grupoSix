import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VSLPage from './pages/VSLPage';
import ThankYouPage from './pages/ThankYouPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VSLPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/obrigado" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
}

export default App;
