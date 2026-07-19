import { View, Text } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-neutral-900">
      <Text className="text-4xl font-bold text-neutral-900 dark:text-white">
        Welcome to Roux UI
      </Text>
      <Text className="mt-4 text-base text-neutral-500">
        Run npx rouxui add component-name to get started
      </Text>
    </View>
  );
}
