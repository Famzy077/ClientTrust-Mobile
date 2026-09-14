import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { LogOut, User, Bell, Shield, ChevronRight, HelpCircle } from 'lucide-react-native';

export default function SettingsScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          await SecureStore.deleteItemAsync('token');
          await SecureStore.deleteItemAsync('user');
          router.replace('/login');
        },
      },
    ]);
  };

  const SettingRow = ({ icon: Icon, title, subtitle }: any) => (
    <TouchableOpacity className="flex-row items-center justify-between p-4 bg-[#131B2B] border-b border-slate-800/60 active:bg-[#1E293B]/50">
      <View className="flex-row items-center">
        <View className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center mr-4 border border-slate-700/50">
          <Icon size={20} color="#94a3b8" />
        </View>
        <View>
          <Text className="text-white font-medium text-base">{title}</Text>
          {subtitle && <Text className="text-slate-400 text-xs mt-0.5">{subtitle}</Text>}
        </View>
      </View>
      <ChevronRight size={20} color="#475569" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="px-6 py-6 border-b border-slate-800/60">
          <Text className="text-2xl font-bold text-white tracking-tight mb-6">Settings</Text>
          
          <View className="flex-row items-center">
            <View className="w-16 h-16 bg-brand rounded-full flex items-center justify-center border-2 border-[#1E293B] shadow-lg">
              <Text className="text-white text-xl font-bold">JD</Text>
            </View>
            <View className="ml-5 flex-1">
              <Text className="text-xl font-bold text-white mb-1">John Doe</Text>
              <Text className="text-slate-400 text-sm mb-2">john.doe@example.com</Text>
              <TouchableOpacity className="bg-slate-800 self-start px-3 py-1.5 rounded-lg border border-slate-700">
                <Text className="text-slate-300 text-xs font-medium">Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="mt-6">
          <Text className="px-6 text-xs font-bold tracking-wider text-slate-500 uppercase mb-2">Account</Text>
          <View className="border-t border-slate-800/60">
            <SettingRow icon={User} title="Personal Information" subtitle="Update your name and contact" />
            <SettingRow icon={Shield} title="Security & Password" subtitle="Manage your security preferences" />
            <SettingRow icon={Bell} title="Notifications" subtitle="Choose what updates you receive" />
          </View>
        </View>

        <View className="mt-8">
          <Text className="px-6 text-xs font-bold tracking-wider text-slate-500 uppercase mb-2">Support</Text>
          <View className="border-t border-slate-800/60">
            <SettingRow icon={HelpCircle} title="Help Center" subtitle="Read FAQs and contact support" />
          </View>
        </View>

        <View className="px-6 mt-10">
          <TouchableOpacity
            onPress={handleLogout}
            className="w-full flex-row items-center justify-center py-4 rounded-xl bg-rose-500/10 border border-rose-500/20"
          >
            <LogOut size={20} color="#f43f5e" className="mr-2" />
            <Text className="text-rose-500 text-base font-semibold">Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
