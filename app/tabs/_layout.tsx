import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="todos" options={{ title: "Todos" }} />
      <Tabs.Screen name="about " options={{ title: "About" }} />
    </Tabs>
  );
}
