import './App.css';
import Notelist from './components/NoteList';
import Notepad from './components/Notepad';
import Sidenavbar from './components/SideNavbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Sidenavbar/>
      <Switch>
        <Route path="/all-notes">
          <Notelist title="All Notes"/>
          <Route path="/all-notes/:id">
            <Notepad/>
          </Route>
        </Route>

        <Route path="/trash">
          <Notelist title="Trash"/>
          <Route path="/trash/:id">
            <Notepad/>
          </Route>
        </Route>
      </Switch>
     
      <Notepad/>
    </div>
    </Router>
  );
}

export default App;
