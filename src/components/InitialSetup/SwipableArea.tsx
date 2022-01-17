import React from "react";
import { StyleSheet } from "react-native";
import CurrentBalanceInput from "./CurrentBalanceInput";
import IncomeInput from "../Income/IncomeInput";
import { Card, IconButton, Colors } from "react-native-paper";

export default function SwipableArea({
  viewKey,
  handleButtonPress,
  errors,
  setErrors,
}: {
  viewKey: string;
  handleButtonPress: () => void;
  errors: boolean;
  setErrors: (value: boolean) => void;
}) {
  const [currentBalance, setCurrentBalance] = React.useState("");

  return (
    <Card style={styles.swipableCard}>
      <Card.Title
        title={
          viewKey === "1" ? "Input your current ballance" : "Input your income"
        }
        subtitle={viewKey === "1" ? "Step 1" : "Step 2"}
        style={styles.cardTitle}
      />
      <Card.Content style={styles.cardContent}>
        {viewKey === "1" ? (
          <CurrentBalanceInput
            currentBalance={currentBalance}
            setCurrentBalance={setCurrentBalance}
            setErrors={setErrors}
            errors={errors}
          />
        ) : (
          <IncomeInput />
        )}
      </Card.Content>
      <Card.Actions
        style={
          viewKey === "1"
            ? { position: "absolute", right: 0, bottom: 0 }
            : { position: "absolute", left: 0, bottom: 0 }
        }
      >
        <IconButton
          icon={viewKey === "1" ? "arrow-right" : "arrow-left"}
          color={Colors.red800}
          size={40}
          onPress={handleButtonPress}
          disabled={errors}
        />
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  swipableCard: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: Colors.amber600,
  },
  cardTitle: {
    width: "100%",
    flexGrow: 0,
    marginTop: 20,
  },
  cardContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
