import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '@pages/home';
import Playlist from '@src/pages/playlist';
// import Song from '@src/pages/song';
import Player from '@components/Player';
import PlayerModel from '@stores/player';
import PlayerContext from '@src/context/PlayerContext';

const playerModel = new PlayerModel();

function App() {
  return (
    <PlayerContext.Provider value={playerModel}>
      <React.Fragment>
        <CssBaseline />
        <Router>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/playlist/:id?" exact component={Playlist} />
            </Switch>
          </React.Suspense>
        </Router>
        <Player />
      </React.Fragment>
    </PlayerContext.Provider>
  );
}

export default App;
