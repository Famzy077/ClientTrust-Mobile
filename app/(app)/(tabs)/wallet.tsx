import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';

export default function WalletScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl font-bold text-white">Wallet</Text>
        <Text className="text-slate-400 mt-2">Your wallet and transactions</Text>
      </View>
    </SafeAreaView>
  );
}
