import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VehiclePage } from './features/vehicles/pages/VehiclePage';
import { ToastContainer } from './shared/ui/molecules/ToastContainer';
import { useToast } from './shared/hooks/useToast';

function App() {
  const { toasts, removeToast /*, addToast */ } = useToast();
  // Note: For a real app, addToast should be provided via Context.
  // Here we are just setting up the container. 
  // To make it globally usable without Context in this simple scope, 
  // we would need to lift state or use a store signal.
  // For this tech test, we will place the container here.

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
        <Routes>
          <Route path="/" element={<VehiclePage />} />
        </Routes>
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    </Router>
  );
}

export default App;
