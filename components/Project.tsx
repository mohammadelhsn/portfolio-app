import React from 'react';
import { Card, Text, Button, Divider, useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { contextClick } from '../utils/Haptics';

type ProjectProps = {
    name: string;
    desc: string;
    url: string;
    config: object;
    onPress: () => void;
};

export default function Project({ name, desc, url, config, onPress }: ProjectProps) {
    const { colors } = useTheme();

    return (
        <Card style={{ borderRadius: 12 }} elevation={3}>
            <Card.Title
                title={name}
                left={(props) => (
                    <MaterialIcons
                        name="folder-open"
                        size={props.size}
                        color={colors.primary}
                    />
                )}
                titleNumberOfLines={0}
                style={{ alignItems: 'center' }}
            />
            <Card.Content>
                <Divider style={{ marginBottom: 10 }} />
                <Text variant="bodyMedium">{desc}</Text>
            </Card.Content>
            <Card.Actions>
                <Button
                    onPress={() => {
                        onPress();
                    }}
                    textColor={colors.primary}
                    style={{ paddingLeft: 4, marginTop: 8 }}
                >
                    View Project →
                </Button>
            </Card.Actions>
        </Card>
    );
}
