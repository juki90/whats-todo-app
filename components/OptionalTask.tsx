import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { theme } from "../styles/theme";
import { Icon } from "react-native-vector-icons/AntDesign";

const ViewStyled = styled(View)`
  flex: 1;
  border: 1px solid ${theme.button_color_primary};
  border-radius: 3px;
  font-size: ${theme.fontSize_default};
  flex-direction: row;
  padding: 4px 12px;
  padding-left: 10px;
  margin-bottom: 10px;
`;

interface OptionalTaskProps {
  id: number;
  title: string;
}

const OptionalTask: React.FC<OptionalTaskProps> = ({ title }) => {
  return (
    <ViewStyled>
      <Text>{title}</Text>
      <TouchableOpacity>
        <Icon
          name="delete"
          color={theme.button_color_primary}
          size={theme.fontSize_default}
        />
      </TouchableOpacity>
    </ViewStyled>
  );
};

export default OptionalTask;
