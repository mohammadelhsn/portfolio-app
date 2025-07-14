import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { Appbar, Button, Text, useTheme } from 'react-native-paper';
import { contextClick } from '../utils/Haptics';
import { useThemeMode } from '../contexts/ThemeContext';
import { getTheme } from '../utils/DataFetch';

type Props = {
    goToProjects: () => void; // declare the prop here as a function with no arguments and no return value
};

export default function HomeRoute({ goToProjects }: Props) {
    const { colors } = useTheme();
    const { themeMode, setThemeMode } = useThemeMode();
    React.useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = await getTheme();
            if (savedTheme) {
                setThemeMode(savedTheme);
            } else {
                setThemeMode(themeMode);
            }
        };
        loadTheme();
    });
    return (
        <>
            <Appbar.Header elevated>
                <Appbar.Content title="Home" />
            </Appbar.Header>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
                backgroundColor: colors.background
            }}>
                <View style={styles.innerBox}>
                    <Text
                        variant="displayLarge"
                        style={{
                            marginBottom: 24,
                            textAlign: 'center',
                        }}
                    >
                        Hi, I'm Mohammad El-Hassan
                    </Text>
                    <Text variant="bodyMedium" style={styles.text}>
                        Computer Science & Psychology student building modern, user-focused
                        mobile apps — passionate about tech & human understanding.
                    </Text>
                    <View style={styles.buttonWrapper}>
                        <Button
                            mode="outlined"
                            onPress={() => (goToProjects())}
                            style={styles.button}
                            contentStyle={{ paddingVertical: 8 }}
                        >
                            View My Work
                        </Button>
                        <Button
                            mode="outlined"
                            onPress={() => (Linking.openURL(`mailto:mohammadelhsn@gmail.com`))}
                            style={styles.button}
                            contentStyle={{ paddingVertical: 8 }}
                        >
                            Contact Me
                        </Button>
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    innerBox: {
        width: '100%',
        maxWidth: 600,
        alignItems: 'center',
    },
    text: {
        marginBottom: 32,
        textAlign: 'center',
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
    },
    button: {
        minWidth: 140,
    },
});
