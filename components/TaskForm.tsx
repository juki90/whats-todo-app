import React, { useState } from "react";
import { Formik } from "formik";
import ActionButton from "./ActionButton";
import { theme } from "../styles/theme";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/AntDesign";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import OptionalTask from "./OptionalTask";

const ViewStyled = styled(View)`
  flex: 1;
  margin-bottom: 50px;
`;

const Label = styled(Text)`
  flex: 1;
  color: ${theme.button_color_secondary};
  font-size: ${parseInt(theme.fontSize_default) + 4}px;
  margin-left: 5px;
`;

const SmallLabel = styled(Text)`
  font-size: 18px;
  color: ${theme.button_color_secondary};
`;

const TextInputStyled = styled(TextInput)`
  flex: 1;
  font-size: ${parseInt(theme.fontSize_default) + 4}px;
  width: ${Dimensions.get("window").width - 25}px;
  border: 2px solid ${theme.button_color_secondary};
  color: ${theme.button_color_secondary};
  padding: 5px 10px;
  margin: 10px 5px 15px 5px;
  border-radius: 4px;
`;

const TextInputBtnStyled = styled(TextInputStyled)`
  width: ${Dimensions.get("window").width - 35}px;
  flex-grow: 5;
`;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    flex: 1,
    fontSize: 16,
    color: theme.button_color_secondary,
  },
  inputAndroid: {
    flex: 1,
    fontSize: 16,
    color: theme.button_color_secondary,
  },
  viewContainer: {
    flex: 1,
    fontSize: 16,
    height: 45,
    width: Dimensions.get("window").width - 25,
    padding: 0,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: theme.button_color_secondary,
    borderRadius: 4,
    color: theme.button_color_secondary,
    paddingRight: 10,
    marginBottom: 15,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 0,
  },
  iconContainer: {
    right: 10,
    top: 5,
    zIndex: -1,
  },
  placeholder: {
    color: theme.button_color_secondary,
  },
});

const TaskForm = () => {
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [timePickerVisible, setTimePickerVisible] = useState<boolean>(false);

  return (
    <Formik
      initialValues={{
        name: "",
        type: "",
        important: false,
        date: "",
        time: "",
        optional: [],
      }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
        <ViewStyled>
          <Label>Task name</Label>
          <TextInputStyled
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
          />
          <Label>Task type</Label>
          <RNPickerSelect
            onValueChange={handleChange("type")}
            placeholder={{
              label: "Select task type",
              value: "",
            }}
            Icon={() => (
              <Icon
                name="downsquare"
                size={30}
                color={theme.button_color_secondary}
              />
            )}
            style={pickerSelectStyles}
            items={[
              { label: "Simple", value: "simple" },
              { label: "With optional tasks", value: "with-optional" },
              { label: "With timer", value: "with-timer" },
            ]}
          />

          {(values.type === "simple" || values.type === "with-optional") && (
            <>
              <Label>Time/date of the task</Label>
              <ActionButton
                color={theme.button_color_secondary}
                title={
                  !values.date
                    ? "Add DATE to the task"
                    : `${new Date(values.date)
                        .getDate()
                        .toString()
                        .padStart(2, "0")}/${new Date(values.date)
                        .getMonth()
                        .toString()
                        .padStart(2, "0")}/${new Date(
                        values.date
                      ).getFullYear()}`
                }
                onPress={() => setDatePickerVisible(true)}
              />
              <ActionButton
                color={theme.button_color_secondary}
                title={
                  !values.time
                    ? "Add TIME to the task"
                    : `${new Date(values.time).getHours()}:${new Date(
                        values.time
                      )
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}`
                }
                onPress={() => setTimePickerVisible(true)}
                style={{ marginBottom: 15 }}
              />
              {datePickerVisible && (
                <DateTimePickerModal
                  isVisible={true}
                  mode="date"
                  onConfirm={(d) => {
                    setDatePickerVisible(false);
                    setFieldValue("date", d);
                  }}
                  onCancel={() => setDatePickerVisible(false)}
                />
              )}
              {timePickerVisible && (
                <DateTimePickerModal
                  isVisible={true}
                  mode="time"
                  onConfirm={(t) => {
                    setTimePickerVisible(false);
                    setFieldValue("time", t);
                  }}
                  onCancel={() => setTimePickerVisible(false)}
                />
              )}
              <Label>Is this task important?</Label>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 15,
                }}
              >
                <CheckBox
                  value={values.important}
                  onValueChange={() =>
                    setFieldValue("important", !values.important)
                  }
                  style={{ borderColor: theme.button_color_secondary }}
                  tintColors={{
                    true: theme.button_color_secondary,
                    false: theme.button_color_secondary,
                  }}
                />
                <SmallLabel> Yes, it is an important task</SmallLabel>
              </View>
            </>
          )}
          {values.type === "with-optional" && (
            <>
              <Label>Add optional tasks for this task</Label>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TextInputBtnStyled />
                <TouchableOpacity
                  style={{
                    flex: 1,
                    height: 50,
                  }}
                >
                  <Icon
                    name="plussquare"
                    color={theme.button_color_secondary}
                    size={45}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <OptionalTask id={0} title="Optional task #1" />
                <OptionalTask id={1} title="Optional task #2" />
                <OptionalTask id={2} title="Optional task #3" />
                <OptionalTask id={3} title="Optional task #4" />
                <OptionalTask id={4} title="Optional task #5" />
              </View>
            </>
          )}
          <Icon
            name="ellipsis1"
            color={theme.button_color_secondary}
            size={100}
            style={{
              flex: 1,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <ActionButton
            color={theme.button_color_tertiary}
            title={"Add to schedule"}
            onPress={handleSubmit}
          />
          <ActionButton
            color={theme.button_color_primary}
            title={"Add to saved"}
            onPress={handleSubmit}
          />
        </ViewStyled>
      )}
    </Formik>
  );
};

export default TaskForm;
