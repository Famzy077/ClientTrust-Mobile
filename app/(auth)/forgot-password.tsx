import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '../../src/lib/api';
import { ArrowLeft } from 'lucide-react-native';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetRequest = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      Alert.alert('Email Sent', 'If an account exists, a password reset link has been sent to your email.');
      router.push({ pathname: '/reset-password', params: { email } });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to request password reset');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-center px-8">
        <View className="mb-10">
          <Text className="text-3xl font-bold text-white mb-2 tracking-tight">Reset password</Text>
          <Text className="text-slate-400 text-sm">Enter your email and we'll send you instructions to reset your password.</Text>
        </View>

        <View className="space-y-5">
          {error ? (
            <View className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg mb-4">
              <Text className="text-red-500 text-sm">{error}</Text>
            </View>
          ) : null}

          <View className="mb-6">
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

          <TouchableOpacity
            disabled={loading}
            onPress={handleResetRequest}
            className={`w-full flex-row justify-center py-4 rounded-lg bg-brand ${loading ? 'opacity-50' : ''}`}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-white text-base font-semibold">Send reset instructions</Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="items-center mt-10">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="flex-row items-center"
          >
            <ArrowLeft size={16} color="#ffffff" />
            <Text className="text-white font-semibold ml-2 text-sm">Back to log in</Text>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
