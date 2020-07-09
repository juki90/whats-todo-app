import React from "react";
import { Platform, StatusBar, View, SafeAreaView } from "react-native";
import Root from "./views/Root";
import { theme } from "./styles/theme";
import styled from "styled-components/native";

const SafeAreaViewStyled = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.background_default};
  margin-top: ${Platform.OS === "android"
    ? Math.floor(StatusBar.currentHeight)
    : 0}px;
`;

export default function App() {
  return (
    <SafeAreaViewStyled>
      <Root />
    </SafeAreaViewStyled>
  );
}
