import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import MovieList from "./Components/MovieList";
import Favourite from "./Components/Favourite";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              <Banner {...props} />
              <MovieList {...props} />
            </>
          )}
        />
        <Route path="/favourite" exact component={Favourite} />
      </Switch>
      {/* <Banner />
       */}
    </Router>
  );
}

export default App;
