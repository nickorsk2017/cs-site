import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {deviceType} from "@utils";
import {
  Main,
  Prices,
  Team,
  Page404,
  Solutions,
  Contacts
} from "./pages";
import {Provider} from "mobx-react";
import {MainStore} from "@stores";
import styles from './App.module.css';

const PREFIX = process.env.prefixMOD || "/";
const mainStore = new MainStore();

const stores = {
  mainStore: mainStore,
  profileStore: mainStore.profileStore,
};

const App = () => {
  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;
  const diagonal = Math.sqrt(innerWidth * innerWidth + innerHeight * innerHeight);
  let zoom;
  if(deviceType() === "desktop"){
    zoom = (diagonal / 1444).toString();
  }
  console.log("device: " + deviceType());
  console.log("diagonal: " + diagonal);

  return (
    <Provider {...stores}>
      <div id="page" style={{zoom}} className={styles.page}>
        <Router>
              <Switch>
                <Route exact path={PREFIX}><Main/></Route>
                <Route path={`${PREFIX}team`}>
                  <Team/>
                </Route>
                <Route path={`${PREFIX}pricing`}>
                  <Prices/>
                </Route>
                <Route path={`${PREFIX}solutions`}>
                  <Solutions/>
                </Route>
                <Route path={`${PREFIX}contacts`}>
                  <Contacts/>
                </Route>
                <Route component={Page404} />
              </Switch>
          </Router>
      </div>
    </Provider>)
}

export default App
