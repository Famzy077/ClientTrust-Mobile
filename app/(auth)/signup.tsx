import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '../../src/lib/api';
import { Eye, EyeOff } from 'lucide-react-native';

export default function SignupScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/signup', formData);
      // Navigate to verify code, passing email as parameter
      router.push({ pathname: '/verify-code', params: { email: formData.email } });
    } catch (err: any) {
      setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} className="px-8">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-white mb-2 tracking-tight">Create your account</Text>
          <Text className="text-slate-400 text-sm">Start tracking your freelance payments today.</Text>
        </View>

        <View className="space-y-5">
          {error ? (
            <View className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg mb-4">
              <Text className="text-red-500 text-sm">{error}</Text>
            </View>
          ) : null}

          <View className="mb-4">
            <Text className="text-sm font-medium text-slate-300 mb-2">Full Name</Text>
            <TextInput
              placeholder="John Doe"
              placeholderTextColor="#475569"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-4 text-slate-200 focus:border-brand"
            />
          </View>

          <View className="mb-4">
            <Text className="text-sm font-medium text-slate-300 mb-2">Email address</Text>
            <TextInput
              placeholder="you@example.com"
              placeholderTextColor="#475569"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              autoCapitalize="none"
              keyboardType="email-address"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-4 text-slate-200 focus:border-brand"
            />
          </View>

          <View className="mb-6">
            <Text className="text-sm font-medium text-slate-300 mb-2">Password</Text>
            <View className="relative justify-center">
              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#475569"
                secureTextEntry={!showPassword}
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-4 pr-12 text-slate-200 tracking-widest focus:border-brand"
              />
              <TouchableOpacity
                className="absolute right-4"
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#64748b" />
                ) : (
                  <Eye size={20} color="#64748b" />
                )}
              </TouchableOpacity>
            </View>
            <Text className="mt-2 text-xs text-slate-500">Must be at least 6 characters long.</Text>
          </View>

          <TouchableOpacity
            disabled={loading}
            onPress={handleSignup}
            className={`w-full flex-row justify-center py-4 rounded-lg bg-brand ${loading ? 'opacity-50' : ''}`}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-white text-base font-semibold">Create account</Text>
            )}
          </TouchableOpacity>
          
          <Text className="text-xs text-center text-slate-500 mt-4 leading-relaxed">
            By clicking "Create account", you agree to our Terms of Service and Privacy Policy.
          </Text>
        </View>

        <View className="flex-row justify-center mt-8">
          <Text className="text-slate-400 text-sm">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text className="text-brand text-sm font-semibold">Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
