import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Download, Plus } from 'lucide-react-native';

const invoices = [
  { id: 'INV-001', client: 'Acme Corp', amount: '$4,500', date: 'Oct 01, 2026', status: 'Paid' },
  { id: 'INV-002', client: 'TechStart Inc', amount: '$6,000', date: 'Oct 15, 2026', status: 'Unpaid' },
  { id: 'INV-003', client: 'Globex', amount: '$1,200', date: 'Nov 02, 2026', status: 'Unpaid' },
  { id: 'INV-004', client: 'Acme Corp', amount: '$3,500', date: 'Sep 10, 2026', status: 'Paid' },
];

export default function InvoicesScreen() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Paid', 'Unpaid'];

  const filteredInvoices = filter === 'All' ? invoices : invoices.filter(i => i.status === filter);

  const renderInvoice = ({ item }: any) => {
    const isPaid = item.status === 'Paid';
    
    return (
      <TouchableOpacity className="bg-[#131B2B] p-5 rounded-xl border border-slate-800 mb-4 active:bg-[#1E293B]/50 shadow-sm">
        <View className="flex-row justify-between items-start mb-4">
          <View>
            <Text className="text-white font-bold text-lg mb-1">{item.id}</Text>
            <Text className="text-slate-400 text-sm">{item.client}</Text>
          </View>
          <View className={`px-2.5 py-1 rounded-full border ${isPaid ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'}`}>
            <Text className={`text-[10px] font-bold uppercase tracking-wider ${isPaid ? 'text-emerald-400' : 'text-rose-400'}`}>
              {item.status}
            </Text>
          </View>
        </View>
        
        <View className="flex-row justify-between items-center pt-4 border-t border-slate-800/60">
          <View>
            <Text className="text-slate-500 text-xs font-medium mb-0.5">Amount</Text>
            <Text className="text-slate-200 font-bold">{item.amount}</Text>
          </View>
          <View className="flex-row items-center gap-4">
            <View className="items-end">
              <Text className="text-slate-500 text-xs font-medium mb-0.5">Date Issued</Text>
              <Text className="text-slate-300 font-medium">{item.date}</Text>
            </View>
            <TouchableOpacity className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
              <Download size={14} color="#94a3b8" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <View className="px-6 py-4 border-b border-slate-800/60">
        <View className="flex-row justify-between items-center mb-4 mt-2">
          <Text className="text-2xl font-bold text-white tracking-tight">Invoices</Text>
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
        data={filteredInvoices}
        keyExtractor={item => item.id}
        renderItem={renderInvoice}
        contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
