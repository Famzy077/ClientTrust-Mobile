import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';

const projects = [
  { id: '1', name: 'Website Redesign', client: 'Acme Corp', status: 'Ongoing', amount: '$4,500', deadline: 'Oct 24, 2026' },
  { id: '2', name: 'Mobile App MVP', client: 'TechStart Inc', status: 'Pending', amount: '$12,000', deadline: 'Nov 12, 2026' },
  { id: '3', name: 'SEO Optimization', client: 'Globex', status: 'Completed', amount: '$2,500', deadline: 'Sep 10, 2026' },
  { id: '4', name: 'Brand Identity', client: 'Initech', status: 'Needs Revision', amount: '$3,000', deadline: 'Sep 15, 2026' },
  { id: '5', name: 'Backend Migration', client: 'Acme Corp', status: 'Ongoing', amount: '$8,000', deadline: 'Dec 01, 2026' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Ongoing': return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
    case 'Pending': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    case 'Completed': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    case 'Needs Revision': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    default: return 'text-slate-400 bg-slate-800 border-slate-700';
  }
};

export default function ProjectsScreen() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Ongoing', 'Completed', 'Pending'];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.status === filter);

  const renderProject = ({ item }: any) => {
    const statusClasses = getStatusColor(item.status).split(' ');
    const textColor = statusClasses[0];
    const bgColor = statusClasses[1];
    const borderColor = statusClasses[2];

    return (
      <TouchableOpacity className="bg-[#131B2B] p-5 rounded-xl border border-slate-800 mb-4 active:bg-[#1E293B]/50 shadow-sm">
        <View className="flex-row justify-between items-start mb-4">
          <View className="flex-1 pr-4">
            <Text className="text-white font-semibold text-lg mb-1" numberOfLines={1}>{item.name}</Text>
            <Text className="text-slate-400 text-sm" numberOfLines={1}>{item.client}</Text>
          </View>
          <View className={`px-2.5 py-1 rounded-full border ${bgColor} ${borderColor}`}>
            <Text className={`text-[10px] font-bold uppercase tracking-wider ${textColor}`}>
              {item.status}
            </Text>
          </View>
        </View>
        
        <View className="flex-row justify-between items-center pt-4 border-t border-slate-800/60">
          <View>
            <Text className="text-slate-500 text-xs font-medium mb-0.5">Amount</Text>
            <Text className="text-slate-200 font-bold">{item.amount}</Text>
          </View>
          <View className="items-end">
            <Text className="text-slate-500 text-xs font-medium mb-0.5">Deadline</Text>
            <Text className="text-slate-300 font-medium">{item.deadline}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <View className="px-6 py-4 border-b border-slate-800/60">
        <View className="flex-row justify-between items-center mb-4 mt-2">
          <Text className="text-2xl font-bold text-white tracking-tight">Projects</Text>
          <TouchableOpacity className="bg-brand w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
            <Plus color="#ffffff" size={24} />
          </TouchableOpacity>
        </View>
        
        <View className="flex-row">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={filters}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setFilter(item)}
                className={`mr-3 px-4 py-2 rounded-full border ${filter === item ? 'bg-[#1E293B] border-brand' : 'bg-slate-900 border-slate-800'}`}
              >
                <Text className={filter === item ? 'text-brand font-semibold' : 'text-slate-400 font-medium'}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      <FlatList
        data={filteredProjects}
        keyExtractor={item => item.id}
        renderItem={renderProject}
        contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
