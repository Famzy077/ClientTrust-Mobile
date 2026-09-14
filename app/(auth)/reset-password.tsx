import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { api } from '../../src/lib/api';
import { Eye, EyeOff } from 'lucide-react-native';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleReset = async () => {
    if (!code || !newPassword) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { email, code, newPassword });
      Alert.alert('Success', 'Password has been reset successfully.');
      router.replace('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-center px-8">
        <View className="mb-10">
          <Text className="text-3xl font-bold text-white mb-2 tracking-tight">Set new password</Text>
          <Text className="text-slate-400 text-sm">Enter the code sent to your email and your new password.</Text>
        </View>

        <View className="space-y-5">
          {error ? (
            <View className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg mb-4">
              <Text className="text-red-500 text-sm">{error}</Text>
            </View>
          ) : null}

          <View className="mb-4">
            <Text className="text-sm font-medium text-slate-300 mb-2">Reset Code</Text>
            <TextInput
              placeholder="••••••"
              placeholderTextColor="#475569"
              value={code}
              onChangeText={(text) => setCode(text.replace(/\D/g, ''))}
              keyboardType="number-pad"
              maxLength={6}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-4 text-slate-200 focus:border-brand"
            />
          </View>

          <View className="mb-6">
            <Text className="text-sm font-medium text-slate-300 mb-2">New Password</Text>
            <View className="relative justify-center">
              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#475569"
                secureTextEntry={!showPassword}
                value={newPassword}
                onChangeText={setNewPassword}
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
            onPress={handleReset}
            className={`w-full flex-row justify-center py-4 rounded-lg bg-brand ${loading ? 'opacity-50' : ''}`}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-white text-base font-semibold">Reset Password</Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-10">
          <TouchableOpacity onPress={() => router.replace('/login')}>
            <Text className="text-brand text-sm font-semibold">Back to login</Text>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
