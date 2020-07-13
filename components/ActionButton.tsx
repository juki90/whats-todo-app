import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Text } from "react-native";
import { darken } from "polished";
import { theme } from "../styles/theme";
import * as Font from "expo-font";
import { AppLoading } from "expo";

const fetchFonts = () => {
  return Font.loadAsync({
    "do-hyeon": require("../assets/fonts/DoHyeon.ttf"),
  });
};

const TouchableOpacityStyled = styled(TouchableOpacity)<any>`
  background-color: ${({ color }) => darken(0.33, color)};
  border-color: ${({ color }) => color};
  border-width: 2px;
  border-style: solid;
  border-radius: 3px;
  padding: 7px 15px;
  margin: 5px;
  min-width: 140px;
`;

const TextStyled = styled(Text)<any>`
  font-size: ${parseInt(theme.fontSize_default) + 2}px;
  font-family: "do-hyeon";
  color: ${({ color }) => color};
  text-align: center;
`;

interface ActionButtonProps {
  color: string;
  title: string;
  onPress?: () => void;
  style?: any;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  onPress,
  color,
  style,
}) => {
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
    <TouchableOpacityStyled color={color} onPress={onPress} style={style}>
      <TextStyled color={color}>{title}</TextStyled>
    </TouchableOpacityStyled>
  );
};

export default ActionButton;
