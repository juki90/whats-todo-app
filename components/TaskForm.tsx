import React from "react";
import { Formik } from "formik";
import ActionButton from "./ActionButton";
import { theme } from "../styles/theme";
import { View, TextInput, Text, StyleSheet, Platform } from "react-native";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const ViewStyled = styled(View)`
  flex: 1;
`;

const Label = styled(Text)`
  flex: 1;
  color: ${theme.button_color_secondary};
  font-size: ${parseInt(theme.fontSize_default) + 4}px;
  margin-left: 5px;
`;

const TextInputStyled = styled(TextInput)`
  flex: 1;
  font-size: ${parseInt(theme.fontSize_default) + 4}px;
  width: ${Dimensions.get("window").width - 25}px;
  border: 2px solid ${theme.button_color_secondary};
  color: ${theme.button_color_secondary};
  padding: 5px 10px;
  margin: 5px 5px 15px 5px;
  border-radius: 4px;
`;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    padding: 0,
    fontSize: 16,
    color: theme.button_color_secondary,
  },
  inputAndroid: {
    padding: 0,
    fontSize: 16,
    color: theme.button_color_secondary,
  },
  viewContainer: {
    fontSize: 16,
    height: 50,
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
});

const TaskForm = () => {
  return (
    <Formik
      initialValues={{ name: "", type: "" }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <ViewStyled>
          <Label>Task name</Label>
          <TextInputStyled
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
          />
          <Label>Task type</Label>
          <RNPickerSelect
            onValueChange={(v) => handleChange(v)}
            useNativeAndroidPickerStyle
            placeholder={{
              label: "Select task type",
              value: null,
            }}
            style={{ ...pickerSelectStyles }}
            items={[
              { label: "Simple", value: "simple" },
              { label: "With options", value: "with-options" },
              { label: "Simple", value: "simple" },
            ]}
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
