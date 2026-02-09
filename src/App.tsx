import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VehiclePage } from './features/vehicles/pages/VehiclePage';
import { MapView } from './features/map/pages/MapView/MapView';
import { ToastContainer } from './shared/ui/molecules/ToastContainer';
import { useToast } from './shared/hooks/useToast';

function App() {
  const { toasts, removeToast } = useToast();

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
        <Routes>
          <Route path="/" element={<VehiclePage />} />
          <Route path="/map" element={<MapView />} />
        </Routes>
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    </Router>
  );
}

export default App;
