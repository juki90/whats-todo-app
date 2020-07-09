import React, { useState } from "react";
import { View, Image, Text, Button, TouchableOpacity } from "react-native";
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

const ViewStyled = styled(View)`
  flex: 1;
  background-color: ${theme.background_default};
  padding: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImageLogo = styled(Image)`
  max-width: 200px;
  max-height: 200px;
  margin: 0 auto;
  padding: 0;
  resize-mode: contain;
`;

const HeaderStyled = styled(Text)`
  color: ${theme.color_default};
  text-align: center;
  font-size: 60px;
  font-family: do-hyeon;
  color: ${theme.header_color_primary};
  margin: 25px auto;
  padding: 15px;
`;

const ButtonCTA = styled(TouchableOpacity)`
  padding: 0 20px;
  background-color: ${theme.button_background_primary};
  border-width: 3px;
  border-color: ${theme.button_borderColor_primary};
  border-style: solid;
  color: ${theme.button_color_primary};
  border-radius: 5px;
  margin: 0 15px 15px 15px;
`;

const ButtonCTAText = styled(Text)`
  color: ${theme.button_color_primary};
  font-weight: bold;
  font-size: ${parseInt(theme.fontSize_default) + 7}px;
`;

const TextStyled = styled(Text)`
  color: ${theme.color_default};
  font-size: ${theme.fontSize_default};
  margin: 20px 15px;
  text-align: center;
`;

const Home: React.FC = () => {
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
    <ViewStyled>
      <ImageLogo source={logo} />
      <HeaderStyled>What's TO DO?</HeaderStyled>
      <ButtonCTA onPress={() => Actions.dashboard()}>
        <ButtonCTAText>Go !</ButtonCTAText>
      </ButtonCTA>
      <TextStyled>
        Go to dashboard. You can create, organize and execute any type of tasks!
      </TextStyled>
    </ViewStyled>
  );
};

export default Home;
