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
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/AntDesign";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import OptionalTask from "./OptionalTask";
import { connect } from "react-redux";
import { addTaskSchedule as addTaskScheduleAction } from "../actions";

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

const Description = styled(Text)`
  color: ${theme.color_default};
  font-size: ${parseInt(theme.fontSize_default) + 4}px;
  margin: 20px 15px;
  text-align: center;
`;

const Circle = styled(View)`
  border: 2px solid ${theme.button_color_primary};
  border-radius: 20px;
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const Radio = styled(TouchableOpacity)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin: 5px 10px;
`;

const Error = styled(Text)`
  flex: 1;
  font-size: ${theme.fontSize_default};
  color: #f55;
  margin: 0 15px 10px 15px;
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

interface TaskFormProps {
  addTaskSchedule: (task: Task) => void;
  schedule: Task[];
}

const TaskForm: React.FC<TaskFormProps> = ({ addTaskSchedule, schedule }) => {
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [timePickerVisible, setTimePickerVisible] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    name: string;
    date: string;
    optional: string;
  }>({ name: "", date: "", optional: "" });

  const handleAddTask: (task: Task) => void = (task) => {
    const fullDate = new Date(
      task.date.setHours(task.time.getHours())
    ).setMinutes(task.time.getMinutes());

    if (!task.name) {
      setErrors({ ...errors, name: "Add task name before adding" });
    }
    if (
      task.type !== "timer" &&
      new Date(fullDate).getTime() < new Date().getTime()
    ) {
      setErrors({
        ...errors,
        date: "Date of the task must start in the future",
      });
    }
    if (task.type === "simple") {
      addTaskSchedule(task);
      return;
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        type: "simple",
        important: false,
        date: new Date(),
        time: new Date(),
        optName: "",
        optional: [],
        regular: 0,
        minutes: "",
      }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleBlur, setFieldValue, values }) => (
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
              label: "Simple",
              value: "simple",
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
                        .padStart(2, "0")}/${(
                        new Date(values.date).getMonth() + 1
                      )
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
                    setErrors({ ...errors, date: "" });
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
                    setErrors({ ...errors, date: "" });
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
          {values.type !== "with-timer" && (
            <>
              <Label>Is this task regular?</Label>
              <Radio onPress={() => setFieldValue("regular", 0)}>
                <Circle
                  style={{
                    backgroundColor:
                      values.regular === 0
                        ? theme.button_color_primary
                        : "transparent",
                  }}
                ></Circle>
                <SmallLabel>No</SmallLabel>
              </Radio>
              <Radio onPress={() => setFieldValue("regular", 1)}>
                <Circle
                  style={{
                    backgroundColor:
                      values.regular === 1
                        ? theme.button_color_primary
                        : "transparent",
                  }}
                ></Circle>
                <SmallLabel>Every 1 day</SmallLabel>
              </Radio>
              <Radio onPress={() => setFieldValue("regular", 7)}>
                <Circle
                  style={{
                    backgroundColor:
                      values.regular === 7
                        ? theme.button_color_primary
                        : "transparent",
                  }}
                ></Circle>
                <SmallLabel>Every 1 week</SmallLabel>
              </Radio>
              <Radio
                onPress={() => setFieldValue("regular", 30)}
                style={{ marginBottom: 15 }}
              >
                <Circle
                  style={{
                    backgroundColor:
                      values.regular === 30
                        ? theme.button_color_primary
                        : "transparent",
                  }}
                ></Circle>
                <SmallLabel>Every 1 month</SmallLabel>
              </Radio>
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
                <TextInputBtnStyled
                  onChangeText={handleChange("optName")}
                  onBlur={handleBlur("optName")}
                />
                <TouchableOpacity
                  style={{
                    flex: 1,
                    height: 50,
                  }}
                  onPress={() => {
                    if (values.optName.length > 0) {
                      setFieldValue("optional", [
                        ...values.optional,
                        { name: values.optName, id: values.optional.length },
                      ]);
                      setErrors({ ...errors, optional: "" });
                      return;
                    }
                    setErrors({
                      ...errors,
                      optional: "Give a name for next optional task",
                    });
                  }}
                >
                  <Icon
                    name="plussquare"
                    color={theme.button_color_secondary}
                    size={45}
                  />
                </TouchableOpacity>
              </View>
              {errors.optional.length > 0 && <Error>{errors.optional}</Error>}
              <View style={{ flex: 1 }}>
                {!!values.optional.length &&
                  values.optional.map((o) => (
                    <OptionalTask
                      key={`optT-${o.id}`}
                      id={o.id}
                      onDelete={setFieldValue}
                      name={o.name}
                      values={values.optional}
                    />
                  ))}
              </View>
            </>
          )}
          {values.type === "with-timer" && (
            <>
              <Description>
                This task starts immediately and is added to your history when
                finished
              </Description>
              <Label>Set timer in minutes</Label>
              <TextInputStyled
                onChangeText={handleChange("minutes")}
                onBlur={handleBlur("minutes")}
                value={values.minutes}
                keyboardType="numeric"
              />
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
          {errors.name.length > 0 && <Error>{errors.name}</Error>}
          {errors.date.length > 0 && <Error>{errors.date}</Error>}
          {values.type !== "with-timer" && (
            <>
              <ActionButton
                color={theme.button_color_tertiary}
                title={"Add to schedule"}
                onPress={() =>
                  handleAddTask({
                    id: schedule.length,
                    name: values.name,
                    date: values.date,
                    time: values.time,
                    type: values.type,
                    important: values.important,
                    regular: values.regular,
                  })
                }
              />
              <ActionButton
                color={theme.button_color_primary}
                title="Add to saved"
                onPress={() => {}}
              />
            </>
          )}
          {values.type === "with-timer" && (
            <ActionButton
              color={theme.button_color_tertiary}
              title={"Start task"}
              onPress={() => {}}
            />
          )}
        </ViewStyled>
      )}
    </Formik>
  );
};

const mapStateToProps = (state) => {
  const { schedule } = state;
  return {
    schedule,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addTaskSchedule: (task: Task) => dispatch(addTaskScheduleAction(task)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
