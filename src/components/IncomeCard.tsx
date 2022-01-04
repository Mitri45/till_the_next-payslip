import React from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  Avatar,
  Card,
  Title,
  Paragraph,
  IconButton,
} from "react-native-paper";
import { IncomeTypeWeekDay } from "../utils/IncomeClass";

export default function IncomeCard({
  name,
  amount,
  repeatDay,
}: {
  name: string;
  amount: number;
  repeatDay: IncomeTypeWeekDay;
}) {
  return (
    <Card style={styles.container}>
      <Card.Title
        title={name}
        right={(props) => (
          <IconButton {...props} icon="pencil" onPress={() => {}} />
        )}
      />
      <Card.Content>
        <Paragraph>Amount: {amount}</Paragraph>
        <Paragraph>Repeat Interval: {repeatDay}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "80%",
    marginVertical: "3%",
    borderWidth: 1,
    borderColor: "#000",
  },
});
