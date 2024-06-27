import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 import AdminScreen from './components/adminScreen/AdminScreen';
// import DevScreen from './components/devScreen/DevScreen';
import Login from './components/login/Login';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />      
          { <Route path="/" element={<AdminScreen />} /> } 
          {/* <Route path="/" element={<DevScreen />} /> */}

        </Routes>
      </div>
    </Router>
  );
};

export default App;