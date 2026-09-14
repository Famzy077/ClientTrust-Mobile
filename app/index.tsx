import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export default function Index() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync('token');
        if (token) {
          router.replace('/(app)');
        } else {
          router.replace('/(auth)/login');
        }
      } catch (error) {
        router.replace('/(auth)/login');
      } finally {
        setIsReady(true);
      }
    };
    
    // Slight delay to ensure router is mounted
    setTimeout(checkAuth, 100);
  }, []);

  return (
    <View className="flex-1 bg-slate-950 justify-center items-center">
      {!isReady && <ActivityIndicator size="large" color="#3b82f6" />}
    </View>
  );
}
