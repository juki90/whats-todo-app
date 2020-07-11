import { useEffect } from "react";
import { BackHandler } from "react-native";
import { Actions } from "react-native-router-flux";

export const useBack = () => {
  const backAction = () => {
    if (Actions.currentScene === "home") {
      BackHandler.exitApp();
      return true;
    }
    if (Actions.currentScene === "dashboard") {
      Actions.home();
      return true;
    }
    Actions.dashboard();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  });
};
