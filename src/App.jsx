import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import HomePage from './components/homePage/HomePage';
import AdminScreen from './components/adminScreen/AdminScreen';
import DevScreen from './components/devScreen/DevScreen';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminScreen />} />
          <Route path="/dev" element={<DevScreen />} />
          <Route path="/client" element={<HomePage />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;