import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PlayerModel from '@src/stores/player';
import Player from '@src/components/Player';
import Loading from '@src/components/Loading';

const Home = React.lazy(() => import('@src/pages/home'));
const Playlist = React.lazy(() => import('@src/pages/playlist'));
// const Demo = React.lazy(() => import('@src/pages/demo'));

const playerModel = new PlayerModel();

// 尝试从缓存中读取歌曲列表
const data = localStorage.getItem('songList');

playerModel.apply(data ? JSON.parse(data) : []);

export const GlobalContext = React.createContext();

function App() {
  return (
    <GlobalContext.Provider value={{ playerModel }}>
      <React.Fragment>
        <CssBaseline />
        <Router>
          <React.Suspense fallback={<Loading />}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/playlist/:id?" exact component={Playlist} />
              {/* <Route path="/demo" exact component={Demo} /> */}
            </Switch>
          </React.Suspense>
        </Router>
        <Player />
      </React.Fragment>
    </GlobalContext.Provider>
  );
}

export default App;
