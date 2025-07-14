import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus, useColorScheme } from 'react-native';

type ThemeMode = 'light' | 'dark' | 'black' | 'system';

interface ThemeContextType {
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeMode = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeMode must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
    const systemScheme = useColorScheme(); // 'light' | 'dark' | null
    const [themeMode, setThemeMode] = useState<ThemeMode>('system');
    const appState = useRef<AppStateStatus>(AppState.currentState);

    // On mount and resume, update theme if in system mode
    useEffect(() => {
        const handleAppStateChange = (nextAppState: AppStateStatus) => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                if (themeMode === 'system') {
                    // Trigger a re-render by re-setting to 'system'
                    setThemeMode('system');
                }
            }
            appState.current = nextAppState;
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => subscription.remove();
    }, [themeMode]);

    // Resolve actual mode
    const resolvedTheme: ThemeMode =
        themeMode === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : themeMode;

    return (
        <ThemeContext.Provider value={{ themeMode: resolvedTheme, setThemeMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
