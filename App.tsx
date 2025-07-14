import BottomNavigationComponent from './components/BottomNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { lightTheme, darkTheme, blackTheme } from './data/Theme';
import { PaperProvider } from 'react-native-paper';
import { ThemeProvider, useThemeMode } from './contexts/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';

const AppContent = () => {
  const { themeMode } = useThemeMode();
  const theme = (() => {
    if (themeMode === 'light') return lightTheme;
    if (themeMode === 'dark') return darkTheme;
    if (themeMode === 'black') return blackTheme;
  })();
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <SafeAreaProvider>
          <BottomNavigationComponent />
        </SafeAreaProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
