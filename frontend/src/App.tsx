import React from 'react';
import './styles/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useUserStore } from '@store/index';

// Pages
import Home from '@pages/Home';
import Discover from '@pages/Discover';
import Profile from '@pages/Profile';
import Auth from '@pages/Auth';
import RestaurantDetail from '@pages/RestaurantDetail';

const App: React.FC = () => {
  const user = useUserStore((state) => state.user);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Routes>
          <Route path="/" element={<Home />} />
          {user ? (
            <>
              <Route path="/discover" element={<Discover />} />
              <Route path="/restaurant/:id" element={<RestaurantDetail />} />
              <Route path="/profile" element={<Profile />} />
            </>
          ) : (
            <Route path="/auth" element={<Auth />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
