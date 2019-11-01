import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '@pages/home';
import Player from '@components/Player';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
        </React.Suspense>
      </Router>
      <Player />
    </React.Fragment>
  );
}

export default App;
