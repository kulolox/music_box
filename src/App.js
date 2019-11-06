import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';

import Home from '@pages/home';
import Details from '@pages/details';
import Player from '@components/Player';
import PlayerModel from '@stores/player';

const playerModel = new PlayerModel();

const sources = [
  {
    name: '放不过自己',
    url:
      'https://fdfs.xmcdn.com/group69/M08/89/77/wKgMb12_xyuwdp3UACODUONoTAk746.m4a'
  },
  {
    name: '差一点',
    url:
      'https://fdfs.xmcdn.com/group69/M08/89/79/wKgMb12_xzbTblvNAB83dFR6BBM461.m4a'
  }
];

playerModel.applyData(sources);

function App() {
  return (
    <Provider playerModel={playerModel}>
      <React.Fragment>
        <CssBaseline />
        <Router>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/details/:id?" exact component={Details} />
            </Switch>
          </React.Suspense>
        </Router>
        <Player />
      </React.Fragment>
    </Provider>
  );
}

export default App;
