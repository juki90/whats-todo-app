import React from "react";
import { ScrollView } from "react-native";
import { Router, Scene, Actions } from "react-native-router-flux";
import Home from "./Home";
import Dashboard from "./Dashboard";
import CreateTask from "./CreateTask";

const Root: React.FC = () => {
  return (
    <Router>
      <ScrollView style={{ flex: 1 }}>
        <Scene key="root" hideNavBar>
          <Scene key="home" initial={true} component={Home} />
          <Scene key="dashboard" initial={true} component={Dashboard} />
          <Scene key="createTask" initial={true} component={CreateTask} />
        </Scene>
      </ScrollView>
    </Router>
  );
};

export default Root;
