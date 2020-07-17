import React from "react";
import styled from "styled-components/native";
import { View, Text } from "react-native";
import { lighten, invert } from "polished";
import { theme } from "../styles/theme";

const ItemContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  border-radius: 5px;
  background-color: ${lighten(0.5, theme.background_board)};
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;
`;

const Name = styled(Text)`
  width: 80%;
  font-size: ${parseInt(theme.fontSize_default) + 4}px;
  color: ${invert(theme.color_default)};
`;

interface BoardItemProps {
  task: Task;
}

const BoardItem: React.FC<BoardItemProps> = ({ task }) => {
  return (
    <ItemContainer>
      <Name>{task.name}</Name>
    </ItemContainer>
  );
};

export default BoardItem;
