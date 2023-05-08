import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav'
import LoginForm from './components/LoginForm.js/LoginForm';
import Home from './components/Home/Home'

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route
          path='/home/:userId'
          element={<Home />}
        />
        <Route
          path='/login'
          element={<LoginForm />}
        />
      </Routes>

    </Router>


  );
}

export default App;
