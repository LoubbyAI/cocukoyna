import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { R } from '../../constants/renkler';
import { useStrings } from '../../i18n';

function TabIcon({ emoji, label, focused }: { emoji: string; label: string; focused: boolean }) {
  return (
    <View style={{ alignItems: 'center', paddingTop: 6 }}>
      <Text style={{ fontSize: 22 }}>{emoji}</Text>
      <Text
        numberOfLines={1}
        style={{
          fontSize: 10,
          fontWeight: '700',
          color: focused ? R.turuncu : R.metinSoft,
          marginTop: 2,
          width: 70,
          textAlign: 'center',
        }}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const S = useStrings();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderTopWidth: 1,
          borderTopColor: 'rgba(0,0,0,0.07)',
          height: 58 + insets.bottom,
          paddingBottom: insets.bottom,
          elevation: 8,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 12,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🎯" label={S.tab_aktiviteler} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="favoriler"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="❤️" label={S.tab_favoriler} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="ayarlar"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="⚙️" label={S.tab_ayarlar} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
