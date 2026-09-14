import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Slot, useRouter, usePathname } from 'expo-router';
import { Settings, TrendingUp, Receipt, LayoutDashboard, Menu } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = 280;

function Sidebar({ closeDrawer }: { closeDrawer: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const navigateTo = (path: any) => {
    router.push(path);
    closeDrawer();
  };

  const navItems = [
    { name: 'Dashboard', path: '/(app)/(tabs)', icon: LayoutDashboard },
    { name: 'Invoices', path: '/(app)/invoices', icon: Receipt },
    { name: 'Analytics', path: '/(app)/analytics', icon: TrendingUp },
    { name: 'Settings', path: '/(app)/settings', icon: Settings },
  ];

  return (
    <View style={[styles.sidebar, { paddingTop: insets.top + 20, paddingBottom: insets.bottom }]}>
      <Text style={styles.sidebarTitle}>ClientTrust</Text>
      
      <View style={styles.navContainer}>
        {navItems.map((item) => {
          const isActive = pathname === item.path || (pathname === '/' && item.path === '/(app)/(tabs)');
          const Icon = item.icon;
          return (
            <TouchableOpacity
              key={item.path}
              style={[styles.navItem, isActive && styles.navItemActive]}
              onPress={() => navigateTo(item.path)}
            >
              <Icon size={20} color={isActive ? '#3b82f6' : '#64748b'} />
              <Text style={[styles.navText, isActive && styles.navTextActive]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function AppLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const toggleDrawer = () => {
    const toValue = isOpen ? 0 : 1;
    setIsOpen(!isOpen);
    Animated.spring(animation, {
      toValue,
      useNativeDriver: true,
      bounciness: 0,
      speed: 20
    }).start();
  };

  const closeDrawer = () => {
    if (isOpen) toggleDrawer();
  };

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-DRAWER_WIDTH, 0]
  });

  const overlayOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5]
  });

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Simple Header for Menu Button */}
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
            <Menu size={24} color="#f8fafc" />
          </TouchableOpacity>
        </View>
        <Slot />
      </View>

      {/* Overlay */}
      {isOpen && (
        <TouchableWithoutFeedback onPress={closeDrawer}>
          <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
        </TouchableWithoutFeedback>
      )}

      {/* Drawer */}
      <Animated.View style={[styles.drawerContainer, { transform: [{ translateX }] }]}>
        <Sidebar closeDrawer={closeDrawer} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  mainContent: {
    flex: 1,
  },
  header: {
    backgroundColor: '#0B0F19',
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    padding: 4,
    marginRight: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    zIndex: 10,
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: DRAWER_WIDTH,
    zIndex: 20,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  sidebar: {
    flex: 1,
    backgroundColor: '#0B0F19',
    paddingHorizontal: 20,
  },
  sidebarTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    paddingHorizontal: 12,
  },
  navContainer: {
    flex: 1,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  navItemActive: {
    backgroundColor: '#1E293B',
  },
  navText: {
    color: '#64748b',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  navTextActive: {
    color: '#3b82f6',
  },
});
