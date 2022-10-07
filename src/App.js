import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";

const Home = () => (
  <>
    <Helmet>
      <title>Home title</title>
    </Helmet>
    <h1>Home</h1>
    <ul>
      <li key="1">
        <Link to="/first-page">First Page</Link>
      </li>
      <li key="2">
        <Link to="/second-page">Second Page</Link>
      </li>
    </ul>
  </>
);

export const FirstPage = () => (
  <>
    <Helmet>
      <title>First title</title>
    </Helmet>
    <h1>First Page</h1>
    <Link to="/">Go back Home</Link>
  </>
);

export const SecondPage = () => (
  <>
    <Helmet>
      <title>Second title</title>
    </Helmet>
    <h1>Second Page</h1>
    <Link to="/">Go back Home</Link>
  </>
);

function App() {
  console.log(process.env.NODE_ENV);
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/first-page" component={FirstPage} />
      <Route path="/second-page" component={SecondPage} />
    </Switch>

  );
}

export default App;