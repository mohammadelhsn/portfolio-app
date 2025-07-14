import { Appbar, Button, Dialog, IconButton, Portal, Text, useTheme, RadioButton, Divider, TouchableRipple, Card, Icon } from 'react-native-paper';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, View } from 'react-native';
import { useThemeMode } from '../contexts/ThemeContext';
import { selectionFeedback } from '../utils/Haptics';
import { storeTheme, getOledViewed, setOledViewed } from '../utils/DataFetch';

export default function Settings() {
    const { colors } = useTheme();
    const { themeMode, setThemeMode } = useThemeMode();
    const [checked, setChecked] = React.useState('dark');
    const [showOledInfo, setShowOledInfo] = React.useState(false);
    const [hasSeenOledInfo, setHasSeenOledInfo] = React.useState(false);
    React.useEffect(() => {
        const loadTheme = async () => {
            const oledInfo = await getOledViewed();
            if (oledInfo) {
                setHasSeenOledInfo(oledInfo);
            } else {
                setHasSeenOledInfo(hasSeenOledInfo);
            }
        };
        setChecked(themeMode);
        loadTheme();
    });
    const onValueChange = (newValue: string) => {
        const castedValue = newValue as 'light' | 'dark' | 'black';
        if (castedValue == 'black' && !hasSeenOledInfo) {
            setShowOledInfo(true);
        }
        storeTheme(castedValue);
        selectionFeedback();
        setChecked(newValue);
        setThemeMode(castedValue);
    };
    return <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Appbar.Header elevated={true}>
            <Appbar.Content title="Settings" />
        </Appbar.Header>
        <ScrollView style={{ backgroundColor: colors.background }}>
            <Card style={{ margin: 20 }}>
                <Card.Title title="Theme" left={(props) => <Icon source="theme-light-dark" color={colors.primary} size={props.size} />} />
                <Card.Content>
                    <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                    <RadioButton.Group onValueChange={onValueChange} value={checked}>
                        <TouchableRipple onPress={() => onValueChange('light')}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', borderTopLeftRadius: 12, borderTopRightRadius: 12, padding: 10, gap: 8 }} >
                                <MaterialIcons name='light-mode' size={24} color={colors.primary} />
                                <Text>Light Mode</Text>
                                <View style={{ marginLeft: 'auto' }}>
                                    <RadioButton value="light" />
                                </View>
                            </View>
                        </TouchableRipple>
                        <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                        <TouchableRipple onPress={() => onValueChange('dark')}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, gap: 8 }}>
                                <MaterialIcons name="dark-mode" size={24} color={colors.primary} />
                                <Text>Dark Mode</Text>
                                <View style={{ marginLeft: 'auto' }}>
                                    <RadioButton value="dark" />
                                </View>
                            </View>
                        </TouchableRipple>
                        <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                        <TouchableRipple onPress={() => onValueChange('black')}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, gap: 8 }}>
                                <MaterialIcons name="battery-saver" size={24} color={colors.primary} />
                                <Text>Dark Mode (OLED)</Text>
                                <IconButton icon="help-circle" size={18} onPress={() => {
                                    setShowOledInfo(true);
                                }} />
                                <View style={{ marginLeft: 'auto' }}>
                                    <RadioButton value="black" />
                                </View>
                            </View>
                        </TouchableRipple>
                    </RadioButton.Group>
                </Card.Content>
            </Card>
            <Portal>
                <Dialog visible={showOledInfo} onDismiss={() => setShowOledInfo(false)}>
                    <Dialog.Title>What is OLED mode?</Dialog.Title>
                    <Dialog.Content>
                        <Text>
                            OLED screens can turn off individual pixels to display pure black. This saves battery on OLED
                            devices and can reduce eye strain in dark environments. Choose this mode for a true black
                            background.
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => {
                            setShowOledInfo(false);
                            setHasSeenOledInfo(true);
                            setOledViewed(true);
                        }}>Close</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </ScrollView >
    </View>;
}