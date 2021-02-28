import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Home from "./pages/home";
import AddUser from "./pages/addusers";
import Settings from "./pages/settings";
import Recommend from "./pages/recommend";

import "./App.css";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: blue[700],
        },
        secondary: {
            main: red[300],
        },
    },
});

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/addusers" component={AddUser} />
                        <Route exact path="/recommend" component={Recommend} />
                        <Route exact path="/settings" component={Settings} />
                    </Switch>
                </Router>
            </ThemeProvider>
        </div>
    );
}

export default App;
