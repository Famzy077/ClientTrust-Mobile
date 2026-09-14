import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { api } from '../../src/lib/api';
import { Eye, EyeOff } from 'lucide-react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data?.token) {
        await SecureStore.setItemAsync('token', res.data.token);
      }
      if (res.data?.data) {
        await SecureStore.setItemAsync('user', JSON.stringify(res.data.data));
      }
      router.replace('/(app)');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-center px-8">
        <View className="mb-10">
          <Text className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome back</Text>
          <Text className="text-slate-400 text-sm">Sign in to your ClientTrust account</Text>
        </View>

        <View className="space-y-5">
          {error ? (
            <View className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg mb-4">
              <Text className="text-red-500 text-sm">{error}</Text>
            </View>
          ) : null}

          <View className="mb-4">
            <Text className="text-sm font-medium text-slate-300 mb-2">Email address</Text>
            <TextInput
              placeholder="you@example.com"
              placeholderTextColor="#475569"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-4 text-slate-200 focus:border-brand"
            />
          </View>

          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-sm font-medium text-slate-300">Password</Text>
              <TouchableOpacity onPress={() => router.push('/forgot-password')}>
                <Text className="text-sm font-medium text-brand">Forgot password?</Text>
              </TouchableOpacity>
            </View>
            <View className="relative justify-center">
              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#475569"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
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
          </View>

          <TouchableOpacity
            disabled={loading}
            onPress={handleLogin}
            className={`w-full flex-row justify-center py-4 rounded-lg bg-brand ${loading ? 'opacity-50' : ''}`}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-white text-base font-semibold">Sign in</Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-8">
          <Text className="text-slate-400 text-sm">No account yet? </Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text className="text-brand text-sm font-semibold">Create one free</Text>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
