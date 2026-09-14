import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { api } from '../../src/lib/api';
import { AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react-native';

const maskEmail = (email: string) => {
  if (!email || !email.includes('@')) return email;
  const [localPart, domain] = email.split('@');
  if (localPart.length <= 2) return `${localPart[0]}***@${domain}`;
  const maskedLocal = `${localPart.substring(0, 2)}***${localPart.substring(localPart.length - 1)}`;
  return `${maskedLocal}@${domain}`;
};

export default function VerifyCodeScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (code.length !== 6) return;
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/verify-code', { email, code });
      Alert.alert('Success', 'Account verified successfully!');
      router.replace('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid or expired validation code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-center px-8">
        <View className="mb-8 items-center">
          <Text className="text-3xl font-bold text-white mb-4 tracking-tight text-center">Check your inbox</Text>
          <Text className="text-slate-400 text-center text-sm leading-relaxed max-w-[280px]">
            We sent a security token to <Text className="text-brand font-medium">{maskEmail(email || '')}</Text>. Input the 6-digit code below.
          </Text>
        </View>

        <View className="space-y-5">
          {error ? (
            <View className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg mb-4 flex-row items-center justify-center gap-2">
              <AlertCircle size={16} color="#ef4444" />
              <Text className="text-red-500 text-sm">{error}</Text>
            </View>
          ) : null}

          <View className="mb-6">
            <Text className="text-sm font-medium text-slate-300 mb-3 text-center uppercase tracking-wider">
              Verification Code
            </Text>
            <TextInput
              maxLength={6}
              placeholder="••••••"
              placeholderTextColor="#334155"
              value={code}
              onChangeText={(text) => setCode(text.replace(/\D/g, ''))}
              keyboardType="number-pad"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-4 text-white text-center text-2xl font-bold tracking-[8px] focus:border-brand"
            />
          </View>

          <TouchableOpacity
            disabled={loading || code.length !== 6}
            onPress={handleVerify}
            className={`w-full flex-row items-center justify-center py-4 rounded-lg bg-brand ${loading || code.length !== 6 ? 'opacity-50' : ''}`}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <>
                <Text className="text-white text-base font-semibold mr-2">Verify & continue</Text>
                <ArrowRight size={18} color="#ffffff" />
              </>
            )}
          </TouchableOpacity>
        </View>

        <View className="items-center mt-10">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="flex-row items-center"
          >
            <ArrowLeft size={16} color="#ffffff" />
            <Text className="text-white font-semibold ml-2 text-sm">Change email address</Text>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
