import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Search, MoreHorizontal, Briefcase } from 'lucide-react-native';

const clients = [
  { id: '1', name: 'Acme Corp', contact: 'contact@acme.com', projects: 3, totalSpent: '$14,500', status: 'Active' },
  { id: '2', name: 'TechStart Inc', contact: 'founder@techstart.io', projects: 1, totalSpent: '$12,000', status: 'Pending' },
  { id: '3', name: 'Globex', contact: 'billing@globex.com', projects: 5, totalSpent: '$32,400', status: 'Active' },
  { id: '4', name: 'Initech', contact: 'lumbergh@initech.com', projects: 0, totalSpent: '$0', status: 'Inactive' },
];

export default function ClientsScreen() {
  const renderClient = ({ item }: any) => (
    <TouchableOpacity className="bg-[#131B2B] p-5 rounded-xl border border-slate-800 mb-4 active:bg-[#1E293B]/50 shadow-sm">
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-row items-center flex-1">
          <View className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700/50 flex items-center justify-center mr-4">
            <Text className="text-slate-300 font-bold text-lg">{item.name.substring(0, 2).toUpperCase()}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-white font-semibold text-base mb-1" numberOfLines={1}>{item.name}</Text>
            <Text className="text-slate-400 text-sm" numberOfLines={1}>{item.contact}</Text>
          </View>
        </View>
        <TouchableOpacity className="p-2 -mr-2 -mt-2">
          <MoreHorizontal size={20} color="#64748b" />
        </TouchableOpacity>
      </View>
      
      <View className="flex-row justify-between items-center pt-4 border-t border-slate-800/60">
        <View className="flex-row items-center">
          <Briefcase size={14} color="#94a3b8" className="mr-1.5" />
          <Text className="text-slate-300 text-sm font-medium">{item.projects} Projects</Text>
        </View>
        <Text className="text-white font-bold">{item.totalSpent}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <View className="px-6 py-4 border-b border-slate-800/60">
        <Text className="text-2xl font-bold text-white tracking-tight mb-4 mt-2">Clients</Text>
        <View className="relative justify-center">
          <TextInput
            placeholder="Search clients..."
            placeholderTextColor="#475569"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-slate-200 focus:border-brand"
          />
          <View className="absolute left-3">
            <Search size={18} color="#64748b" />
          </View>
        </View>
      </View>

      <FlatList
        data={clients}
        keyExtractor={item => item.id}
        renderItem={renderClient}
        contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
}
