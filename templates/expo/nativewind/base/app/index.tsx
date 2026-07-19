import { View, Text } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center gap-3 bg-white p-6 dark:bg-zinc-950">
      <Text className="text-2xl font-bold text-zinc-900 dark:text-white">
        Welcome to roux-template
      </Text>
      <Text className="text-zinc-500">Edit app/index.tsx to get started.</Text>
    </View>
  );
}
