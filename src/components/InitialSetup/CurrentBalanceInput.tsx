import * as React from "react";
import {
  View,
  Text,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import { TextInput, HelperText } from "react-native-paper";

const CurrentBalanceInput = ({
  currentBalance,
  setCurrentBalance,
  setErrors,
  errors,
}: {
  currentBalance: string;
  setCurrentBalance: (value: string) => void;
  setErrors: (value: boolean) => void;
  errors: boolean;
}) => {
  console.log("CurrentBalanceInput: text: ", currentBalance);

  const checkErrors = (text: string) => {
    if (text === "" || !Number(text) || Number(text) < 0) {
      setErrors(true);
      return true;
    }
    setErrors(false);
    return false;
  };

  const onChangeText = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    checkErrors(e.nativeEvent.text);
    setCurrentBalance(e.nativeEvent.text);
  };

  const onInputFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    checkErrors(e.nativeEvent.text);
  };

  return (
    <View>
      <TextInput
        mode="outlined"
        label="Current balance"
        placeholder="NZD"
        keyboardType="numeric"
        value={currentBalance}
        onChange={onChangeText}
        onBlur={(e) => setCurrentBalance(e.nativeEvent.text)}
        onFocus={onInputFocus}
        style={{ width: "80%", alignSelf: "center", marginTop: 20 }}
      />
      <HelperText
        type="error"
        visible={errors}
        style={{ width: "80%", alignSelf: "center" }}
      >
        Enter positive number only.
      </HelperText>
    </View>
  );
};

export default CurrentBalanceInput;
