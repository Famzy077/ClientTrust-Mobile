import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { DollarSign, Clock, Briefcase, AlertCircle } from 'lucide-react-native';
import { LineChart } from 'react-native-gifted-charts';

// Dummy data mocking the hooks from Phase 1
const chartData = [
  { value: 1200, label: 'Jan' },
  { value: 3000, label: 'Feb' },
  { value: 4500, label: 'Mar' },
  { value: 3200, label: 'Apr' },
  { value: 6000, label: 'May' },
  { value: 5400, label: 'Jun' }
];

const recentProjects = [
  { id: '1', name: 'Website Redesign', client: 'Acme Corp', status: 'Ongoing', amount: '$4,500', deadline: 'Oct 24' },
  { id: '2', name: 'Mobile App MVP', client: 'TechStart', status: 'Pending', amount: '$12,000', deadline: 'Nov 12' },
  { id: '3', name: 'SEO Optimization', client: 'Globex', status: 'Completed', amount: '$2,500', deadline: 'Sep 10' },
];

const stats = {
  totalEarnings: '24,500',
  pendingPayments: '3,200',
  activeProjects: '4',
  overdueProjects: '1'
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Ongoing': return 'text-indigo-400 bg-indigo-500/10';
    case 'Pending': return 'text-amber-400 bg-amber-500/10';
    case 'Completed': return 'text-emerald-400 bg-emerald-500/10';
    default: return 'text-slate-400 bg-slate-800';
  }
};

export default function DashboardScreen() {
  const renderHeader = () => (
    <View className="mb-6">
      <View className="mb-6 mt-4">
        <Text className="text-2xl font-bold text-white tracking-tight">Overview</Text>
        <Text className="text-slate-400 text-sm mt-1">Here's what's happening with your projects today.</Text>
      </View>

      {/* Top Stats Cards */}
      <View className="flex-row flex-wrap justify-between mb-2">
        <View className="w-[48%] bg-[#131B2B] p-4 rounded-xl border border-slate-800 mb-4 shadow-sm">
          <View className="flex-row justify-between items-start mb-3">
            <Text className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">Total Earnings</Text>
            <DollarSign size={14} color="#94a3b8" />
          </View>
          <Text className="text-xl font-bold text-white mb-1">${stats.totalEarnings}</Text>
          <Text className="text-[10px] text-emerald-400 font-medium">total revenue</Text>
        </View>

        <View className="w-[48%] bg-[#131B2B] p-4 rounded-xl border border-slate-800 mb-4 shadow-sm">
          <View className="flex-row justify-between items-start mb-3">
            <Text className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">Pending</Text>
            <Clock size={14} color="#94a3b8" />
          </View>
          <Text className="text-xl font-bold text-white mb-1">${stats.pendingPayments}</Text>
          <Text className="text-[10px] text-slate-400 font-medium">outstanding balance</Text>
        </View>

        <View className="w-[48%] bg-[#131B2B] p-4 rounded-xl border border-slate-800 mb-4 shadow-sm">
          <View className="flex-row justify-between items-start mb-3">
            <Text className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">Active</Text>
            <Briefcase size={14} color="#94a3b8" />
          </View>
          <Text className="text-xl font-bold text-white mb-1">{stats.activeProjects}</Text>
          <Text className="text-[10px] text-indigo-400 font-medium">currently ongoing</Text>
        </View>

        <View className="w-[48%] bg-[#131B2B] p-4 rounded-xl border border-slate-800 mb-4 shadow-sm">
          <View className="flex-row justify-between items-start mb-3">
            <Text className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">Overdue</Text>
            <AlertCircle size={14} color="#94a3b8" />
          </View>
          <Text className="text-xl font-bold text-white mb-1">{stats.overdueProjects}</Text>
          <Text className="text-[10px] text-rose-500 font-medium">action needed</Text>
        </View>
      </View>

      {/* Revenue Area Chart */}
      <View className="bg-[#131B2B] border border-slate-800 rounded-xl p-5 mb-6">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-base font-semibold text-white">Revenue Overview</Text>
          <View className="bg-[#0F172A] px-3 py-1 rounded-full border border-slate-800">
            <Text className="text-xs font-medium text-slate-500">Last 6 Months</Text>
          </View>
        </View>
        <View className="ml-[-10px]">
          <LineChart
            data={chartData}
            areaChart
            hideDataPoints
            isAnimated
            color="#3b82f6"
            startFillColor="#3b82f6"
            endFillColor="#3b82f6"
            startOpacity={0.3}
            endOpacity={0.0}
            thickness={3}
            width={Dimensions.get('window').width - 100}
            height={160}
            yAxisTextStyle={{ color: '#64748b', fontSize: 10 }}
            xAxisLabelTextStyle={{ color: '#64748b', fontSize: 10 }}
            hideRules
            yAxisColor="transparent"
            xAxisColor="transparent"
          />
        </View>
      </View>

      {/* Status Breakdown */}
      <View className="bg-[#131B2B] border border-slate-800 rounded-xl p-5 mb-6">
        <Text className="text-base font-semibold text-white mb-5">Project Status Breakdown</Text>
        
        <View className="mb-4">
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm font-medium text-slate-300">Completed</Text>
            <Text className="text-sm font-medium text-slate-400">45%</Text>
          </View>
          <View className="w-full h-2 bg-[#0B0F19] rounded-full border border-slate-800/50 overflow-hidden">
            <View className="h-full bg-emerald-500" style={{ width: '45%' }} />
          </View>
        </View>
        
        <View className="mb-4">
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm font-medium text-slate-300">Ongoing</Text>
            <Text className="text-sm font-medium text-slate-400">40%</Text>
          </View>
          <View className="w-full h-2 bg-[#0B0F19] rounded-full border border-slate-800/50 overflow-hidden">
            <View className="h-full bg-indigo-500" style={{ width: '40%' }} />
          </View>
        </View>

        <View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm font-medium text-slate-300">Pending</Text>
            <Text className="text-sm font-medium text-slate-400">15%</Text>
          </View>
          <View className="w-full h-2 bg-[#0B0F19] rounded-full border border-slate-800/50 overflow-hidden">
            <View className="h-full bg-amber-500" style={{ width: '15%' }} />
          </View>
        </View>
      </View>

      <Text className="text-base font-semibold text-white mb-4">Recent Projects</Text>
    </View>
  );

  const renderProjectItem = ({ item }: any) => (
    <TouchableOpacity className="bg-[#131B2B] p-4 rounded-xl border border-slate-800 mb-3 active:bg-slate-800/50">
      <View className="flex-row justify-between items-start mb-1">
        <View className="flex-1">
          <Text className="text-white font-semibold text-base mb-0.5">{item.name}</Text>
          <Text className="text-slate-400 text-xs">{item.client}</Text>
        </View>
        <View className={`px-2.5 py-1 rounded-full ${getStatusColor(item.status).split(' ')[1]}`}>
          <Text className={`text-[10px] font-bold uppercase tracking-wider ${getStatusColor(item.status).split(' ')[0]}`}>
            {item.status}
          </Text>
        </View>
      </View>
      <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-slate-800/50">
        <Text className="text-slate-200 font-medium">{item.amount}</Text>
        <Text className="text-slate-500 text-xs">Due: {item.deadline}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <FlatList
        data={recentProjects}
        keyExtractor={(item) => item.id}
        renderItem={renderProjectItem}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
