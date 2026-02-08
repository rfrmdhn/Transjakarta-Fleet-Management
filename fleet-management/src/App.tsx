import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VehiclePage } from './features/vehicles/pages/VehiclePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VehiclePage />} />
      </Routes>
    </Router>
  );
}

export default App;
