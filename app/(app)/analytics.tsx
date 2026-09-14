import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { BarChart, PieChart } from 'react-native-gifted-charts';

export default function AnalyticsScreen() {
  const barData = [
    { value: 2500, label: 'Mon' },
    { value: 3000, label: 'Tue', frontColor: '#818cf8' },
    { value: 4500, label: 'Wed', frontColor: '#3b82f6' },
    { value: 3200, label: 'Thu' },
    { value: 6000, label: 'Fri', frontColor: '#10b981' },
    { value: 2000, label: 'Sat' },
    { value: 1500, label: 'Sun' },
  ];

  const pieData = [
    { value: 45, color: '#10b981', text: '45%' },
    { value: 40, color: '#818cf8', text: '40%' },
    { value: 15, color: '#f59e0b', text: '15%' }
  ];

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="px-6 py-4 border-b border-slate-800/60 mb-6">
          <Text className="text-2xl font-bold text-white tracking-tight mt-2">Analytics</Text>
          <Text className="text-slate-400 text-sm mt-1">Deep dive into your business metrics.</Text>
        </View>

        <View className="px-6 space-y-6">
          {/* Income By Day Bar Chart */}
          <View className="bg-[#131B2B] p-5 rounded-xl border border-slate-800 shadow-sm mb-6">
            <Text className="text-base font-semibold text-white mb-6">Income by Day</Text>
            <View className="ml-[-10px]">
              <BarChart
                data={barData}
                barWidth={22}
                noOfSections={3}
                barBorderRadius={4}
                frontColor="#1E293B"
                yAxisTextStyle={{ color: '#64748b', fontSize: 10 }}
                xAxisLabelTextStyle={{ color: '#64748b', fontSize: 10 }}
                yAxisColor="transparent"
                xAxisColor="transparent"
                hideRules
                width={Dimensions.get('window').width - 100}
                height={160}
              />
            </View>
          </View>

          {/* Revenue Sources Pie Chart */}
          <View className="bg-[#131B2B] p-5 rounded-xl border border-slate-800 shadow-sm mb-6">
            <Text className="text-base font-semibold text-white mb-6">Revenue Sources</Text>
            <View className="flex-row justify-center items-center">
              <PieChart
                data={pieData}
                donut
                showText
                textColor="white"
                innerRadius={60}
                radius={90}
                textSize={12}
                textBackgroundRadius={14}
              />
            </View>
            <View className="flex-row justify-between items-center mt-6 border-t border-slate-800/60 pt-4">
              <View className="flex-row items-center">
                <View className="w-3 h-3 rounded-full bg-emerald-500 mr-2" />
                <Text className="text-slate-300 text-sm">Design</Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-3 h-3 rounded-full bg-indigo-500 mr-2" />
                <Text className="text-slate-300 text-sm">Development</Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-3 h-3 rounded-full bg-amber-500 mr-2" />
                <Text className="text-slate-300 text-sm">Consulting</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
