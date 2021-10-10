import './App.scss';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import Auth from './components/Auth/Auth';
import Dashboard from './components/AdminPanelContent/Dashboard';

function App() {

  useEffect(() => {
    window.onbeforeunload = confirmExit;
    function confirmExit() {
      return "Leave Site?";
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" component={Dashboard} />
        <Redirect from="*" to="/auth" />
      </Switch>
    </Router>
  )
}

export default App;
