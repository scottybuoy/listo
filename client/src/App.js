import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav'
import SignupForm from './components/Signup/Signup';
import Home from './components/Home/Home';
import Lists from './components/Lists/Lists'
import SingleList from './components/SingleList/SingleList';
import NewList from './components/NewList/NewList';
import SingleChecklist from './components/SingleChecklist/SingleChecklist';
import Checklists from './components/Checklists/Checklists';
import ShareListIndex from './components/ShareListIndex/ShareListIndex';
import './App.css';

function App() {
  return (
    <div className=''>
      <Router>

        <Routes>
          <Route
            path='/signup'
            element={<SignupForm />}
          />
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/:userId/list/:listId'
            element={<SingleList />}
          />
          <Route
            path='/:userId/my-lists'
            element={<Lists />}
          ></Route>
          <Route
            path='/:userId/newList'
            element={<NewList />}
          />
          <Route
            path='/checklists'
            element={<Checklists />}
          />
          <Route
            path='/checklist/:checklistId'
            element={<SingleChecklist />}
          />
          <Route
            path='/share-lists'
            element={<ShareListIndex />}
          />
        </Routes>
        <Nav />
      </Router>

    </div>
  );
}

export default App;
