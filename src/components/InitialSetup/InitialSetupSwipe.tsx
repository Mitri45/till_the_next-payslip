import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import PagerView from "react-native-pager-view";
import { IconButton, ProgressBar, Colors } from "react-native-paper";
import SwipableArea from "./SwipableArea";

const InitialSetupSwipe = () => {
  const [step, setStep] = React.useState(1);
  const [errors, setErrors] = React.useState(true);

  const ref = React.useRef<PagerView>(null);
  const handleButtonPress = () => {
    console.log("step", step);
    if (ref && ref.current) {
      ref.current.setPage(step === 1 ? step - 1 : step + 1);
    }
  };
  return (
    <SafeAreaProvider style={{ backgroundColor: Colors.amber600 }}>
      <SafeAreaView style={styles.container}>
        <PagerView
          style={styles.swipeArea}
          initialPage={0}
          onPageSelected={(e) =>
            setStep(e.nativeEvent.position === 1 ? 1 : 0.5)
          }
          showPageIndicator={true}
          ref={ref}
          scrollEnabled={!errors}
        >
          <View style={styles.swipeAreaInner} key="1">
            <SwipableArea
              viewKey="1"
              handleButtonPress={handleButtonPress}
              errors={errors}
              setErrors={setErrors}
            />
            <ProgressBar progress={step} color={Colors.red800} />
          </View>
          <View style={styles.swipeAreaInner} key="2">
            <SwipableArea
              viewKey="2"
              handleButtonPress={handleButtonPress}
              errors={errors}
              setErrors={setErrors}
            />
            <ProgressBar progress={step} color={Colors.red800} />
          </View>
        </PagerView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swipeArea: {
    flex: 1,
    backgroundColor: "green",
  },
  swipableCard: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: Colors.amber600,
  },
  swipeAreaInner: {
    flex: 1,
  },
});

export default InitialSetupSwipe;
