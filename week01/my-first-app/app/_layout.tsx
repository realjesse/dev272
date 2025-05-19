import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import "@/global.css";
import { GluestackUIProvider, ModeType } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { createContext, useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { PaintingProvider } from '@/components/ui/painting-contex-provider';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppState } from 'react-native';
import { supabase } from '@/utils/supabase';

type ThemeContextType = {
  colorMode: ModeType;
  toggleColorMode: (mode: ModeType) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  colorMode: "light",
  toggleColorMode: () => {},
});

const queryClient = new QueryClient();

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [colorMode, setColorMode] = useState<ModeType>("light");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // handle initial superbase auth
  useEffect(() => {
    const autoSignin = async () => {
      if (isAuthenticated) {
        console.log("user is already authenticated, skipping sign-in.");
        return;
      }

      const {data, error} = await supabase.auth.signInWithPassword({
        email: "test@dev.com",
        password: "testtest",
      });
      
      if (error) {
        console.error("Error signing in:", error);
      } else {
        setIsAuthenticated(true);
        console.log("Signed in user:", data);
      }
    }

    autoSignin();
  }, [isAuthenticated])

  if (!loaded) {
    return null;
  }

  const toggleColorMode = async () => {
    setColorMode((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode={colorMode}>
        <ThemeContext.Provider value={{colorMode, toggleColorMode}}>
          <PaintingProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </PaintingProvider>
          <StatusBar style="auto" />
        </ThemeContext.Provider>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
