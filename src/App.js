import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const Home = React.lazy(() => import('@components/Home'));
const HelloWorld = React.lazy(() => import('@components/HelloWorld'));

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/helloworld">Hello World</Link>
          </li>
        </ul>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/helloworld" component={HelloWorld} />
          </Switch>
        </React.Suspense>
      </div>
    </Router>
  );
}

export default App;
