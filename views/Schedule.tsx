import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import styled from "styled-components/native";
import { theme } from "../styles/theme";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { useBack } from "../hooks/useBack";
import BoardItem from "./../components/BoardItem";
import { connect } from "react-redux";

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

const SubheaderStyled = styled(Text)`
  color: ${theme.color_default};
  font-size: ${parseInt(theme.fontSize_default) + 4}px;
  margin: 20px 15px;
  text-align: center;
`;

const Info = styled(Text)`
  color: ${theme.button_color_secondary};
  font-size: ${parseInt(theme.fontSize_default) + 4}px;
  text-align: center;
`;

const Board = styled(View)`
  width: 100%;
`;

interface ScheduleProps {
  schedule: Task[];
}

const Schedule: React.FC<ScheduleProps> = ({ schedule }) => {
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  useBack();

  const scheduleElements = schedule
    .sort((a, b) => {
      return new Date(a.start).getTime() < new Date(b.start).getTime() ? 1 : -1;
    })
    .map((t) => <BoardItem key={`bi-${t.id}`} task={t} />);

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
      <HeaderStyled>SCHEDULE TASKS</HeaderStyled>
      <SubheaderStyled>
        Here you can find your planned tasks sorted from the closest to the
        furthest
      </SubheaderStyled>
      <Board>
        {scheduleElements.length > 0 ? (
          scheduleElements
        ) : (
          <Info>No tasks at the moment</Info>
        )}
      </Board>
    </ScrollViewStyled>
  );
};

const mapStateToProps = (state) => {
  const { schedule } = state;
  return {
    schedule,
  };
};

export default connect(mapStateToProps)(Schedule);
