import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Player from '@components/Player';
import PlayerModel from '@stores/player';
// import Loading from '@components/Loading';

const Home = React.lazy(() => import('@pages/home'));
const Playlist = React.lazy(() => import('@pages/playlist'));

const playerModel = new PlayerModel();

export const GlobalContext = React.createContext();

function App() {
  return (
    <GlobalContext.Provider value={{ playerModel }}>
      <React.Fragment>
        <CssBaseline />
        <Router>
          <React.Suspense fallback={null}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/playlist/:id?" exact component={Playlist} />
            </Switch>
          </React.Suspense>
        </Router>
        <Player />
      </React.Fragment>
    </GlobalContext.Provider>
  );
}

export default App;
