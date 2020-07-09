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
import { logo } from "../assets/images";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { Actions } from "react-native-router-flux";

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
  color: ${theme.header_color_primary};
  margin: 25px auto 0 auto;
  padding: 0 15px;
`;

const ButtonCTA = styled(TouchableOpacity)`
  padding: 0 20px;
  background-color: ${theme.button_background_primary};
  border-width: 3px;
  border-color: ${theme.button_borderColor_primary};
  border-style: solid;
  color: ${theme.button_color_primary};
  border-radius: 5px;
  margin: 0 15px;
`;

const ButtonCTAText = styled(Text)`
  color: ${theme.button_color_primary};
  font-weight: bold;
  font-size: 30px;
  margin-bottom: 4px;
`;

const SubheaderStyled = styled(Text)`
  color: ${theme.color_default};
  font-size: ${parseInt(theme.fontSize_default) + 4}px;
  margin: 20px 15px;
  text-align: center;
`;

const Dashboard: React.FC = () => {
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

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
      <HeaderStyled>DASHBOARD</HeaderStyled>
      <SubheaderStyled>Create, organize and execute your tasks</SubheaderStyled>
      <ButtonCTA>
        <ButtonCTAText onPress={() => Actions.home()}>Back</ButtonCTAText>
      </ButtonCTA>
      <SubheaderStyled>aaaaa</SubheaderStyled>
    </ScrollViewStyled>
  );
};

export default Dashboard;
