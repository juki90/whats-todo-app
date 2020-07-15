import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { theme } from "../styles/theme";
import Icon from "react-native-vector-icons/AntDesign";

const ViewStyled = styled(View)`
  flex: 1;
  border: 1px solid ${theme.button_color_primary};
  border-radius: 3px;
  font-size: ${theme.fontSize_default};
  flex-direction: row;
  padding: 4px 6px;
  margin: 0 0 10px 5px;
  width: 96%;
  align-items: flex-start;
`;

const TextStyled = styled(Text)`
  font-size: ${theme.fontSize_default};
  color: ${theme.button_color_secondary};
  width: 80%;
`;

const TouchableOpacityStyled = styled(TouchableOpacity)`
  height: 30px;
  padding: 5px;
  border-radius: 3px;
  border: 1px solid ${theme.button_color_secondary};
  margin-left: auto;
`;

interface OptionalTaskProps {
  id: number;
  name: string;
  onDelete: (field: string, value: any, shouldValidate?: boolean) => void;
  values: { id: number; name: string }[];
}

const OptionalTask: React.FC<OptionalTaskProps> = ({
  id,
  name,
  values,
  onDelete,
}) => {
  const handleDelete = (id) => {
    onDelete(
      "optional",
      values
        .filter((v) => v.id !== id)
        .map((v, i) => {
          const vl = v;
          vl.id = i;
          return vl;
        })
    );
  };
  return (
    <ViewStyled>
      <TextStyled>{name}</TextStyled>
      <TouchableOpacityStyled onPress={() => handleDelete(id)}>
        <Icon
          name="delete"
          color={theme.button_color_primary}
          size={parseInt(theme.fontSize_default)}
        />
      </TouchableOpacityStyled>
    </ViewStyled>
  );
};

export default OptionalTask;
