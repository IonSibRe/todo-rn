import { Linking, ScrollView, StyleSheet, Text } from "react-native";

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>O aplikaci</Text>

      <Text style={styles.text}>
        Todo RN je jednoduchá mobilní aplikace vytvořená v React Native s Expo
        Router. Slouží k evidenci úkolů, jejich editaci a mazání, s ukládáním do
        perzistentní paměti zařízení.
      </Text>

      <Text style={styles.subtitle}>Funkce:</Text>
      <Text style={styles.text}>• Přidávání a editace úkolů</Text>
      <Text style={styles.text}>• Mazání úkolů</Text>
      <Text style={styles.text}>• Zobrazení data vytvoření úkolu</Text>
      <Text style={styles.text}>
        • Ukládání do AsyncStorage (trvalé ukládání)
      </Text>
      <Text style={styles.text}>• Načítání dat z REST API (Home Screen)</Text>

      <Text style={styles.subtitle}>Author:</Text>
      <Text style={styles.text}>Michal Mikl</Text>

      <Text style={styles.subtitle}>GitHub / Contact:</Text>
      <Text
        style={[styles.text, styles.link]}
        onPress={() => Linking.openURL("https://github.com/tvuj-github")}
      >
        https://github.com/tvuj-github
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    lineHeight: 22,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
