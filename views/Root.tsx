import React from "react";
import { ScrollView } from "react-native";
import { Router, Scene, Actions } from "react-native-router-flux";
import Home from "./Home";
import Dashboard from "./Dashboard";
import CreateTask from "./CreateTask";
import { Provider } from "react-redux";
import store from "../store";
import Schedule from "./Schedule";

const Root: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <ScrollView keyboardShouldPersistTaps={"always"} style={{ flex: 1 }}>
          <Scene key="root" hideNavBar>
            <Scene key="home" initial={true} component={Home} />
            <Scene key="dashboard" initial={true} component={Dashboard} />
            <Scene key="createTask" initial={true} component={CreateTask} />
            <Scene key="schedule" initial={true} component={Schedule} />
          </Scene>
        </ScrollView>
      </Router>
    </Provider>
  );
};

export default Root;
