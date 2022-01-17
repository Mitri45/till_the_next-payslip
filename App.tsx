import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { RecoilRoot, useRecoilSnapshot } from "recoil";
import { LogBox } from "react-native";
import Navigation from "./src/screens/Navigation";

LogBox.ignoreLogs(["timer"]);

function DebugObserver() {
  const snapshot = useRecoilSnapshot();
  React.useEffect(() => {
    console.debug("The following atoms were modified:");
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return null;
}
export default function App() {
  return (
    <RecoilRoot>
      <DebugObserver />
      <PaperProvider>
        <Navigation />
      </PaperProvider>
    </RecoilRoot>
  );
}
