import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styled from "styled-components/native";
import { theme } from "../styles/theme";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import ActionButton from "./../components/ActionButton";
import { useBack } from "../hooks/useBack";

const fetchFonts = () => {
  return Font.loadAsync({
    "do-hyeon": require("../assets/fonts/DoHyeon.ttf"),
  });
};

const ScrollViewStyled = styled(ScrollView)`
  flex: 1;
  background-color: ${theme.background_default};
  padding: 10px;
  flex-direction: column;
`;

const HeaderStyled = styled(Text)`
  color: ${theme.color_default};
  text-align: center;
  font-size: 60px;
  font-family: do-hyeon;
  color: ${theme.button_color_tertiary};
  margin: 25px auto 0 auto;
  padding: 0 15px;
`;

const SubheaderStyled = styled(Text)`
  color: ${theme.color_default};
  font-size: ${parseInt(theme.fontSize_default) + 4}px;
  margin: 20px 15px;
  text-align: center;
`;

const ButtonGroup = styled(View)`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Board = styled(View)`
  background-color: ${theme.background_board};
`;

const CreateTask: React.FC = () => {
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  useBack();

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }

  return (
    <ScrollViewStyled contentContainerStyle={{ alignItems: "center" }}>
      <HeaderStyled>CREATE TASK</HeaderStyled>
      <SubheaderStyled>Create a new task of any type</SubheaderStyled>
      <ButtonGroup />
      <Board></Board>
    </ScrollViewStyled>
  );
};

export default CreateTask;
