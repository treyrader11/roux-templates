import { View, Text, StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Roux UI</Text>
      <Text style={styles.subtitle}>
        Run npx rouxui add component-name to get started
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#171717",
  },
  subtitle: {
    marginTop: 16,
    fontSize: 16,
    color: "#737373",
  },
});
