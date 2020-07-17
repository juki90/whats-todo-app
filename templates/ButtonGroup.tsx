import React from "react";
import ActionButton from "../components/ActionButton";
import { theme } from "../styles/theme";
import styled from "styled-components/native";
import { View } from "react-native";
import { Actions } from "react-native-router-flux";

const BtnGroup = styled(View)`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const ButtonGroup: React.FC = () => (
  <BtnGroup>
    <ActionButton color={theme.button_color_secondary} title="History tasks" />
    <ActionButton
      onPress={() => Actions.schedule()}
      color={theme.button_color_secondary}
      title="Schedule tasks"
    />
    <ActionButton color={theme.button_color_primary} title="Saved tasks" />
    <ActionButton
      onPress={() => Actions.createTask()}
      color={theme.button_color_tertiary}
      title="Create task"
    />
  </BtnGroup>
);

export default ButtonGroup;
