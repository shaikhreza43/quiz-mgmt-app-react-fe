import './App.scss';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import Auth from './components/Auth/Auth';

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
        <Redirect from="*" to="/auth" />
      </Switch>
    </Router>
  )
}

export default App;
