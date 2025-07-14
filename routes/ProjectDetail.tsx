import React from 'react';
import { View, ScrollView, Linking } from 'react-native';
import { Appbar, Button, Card, Divider, Icon, List, Surface, Text, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { contextClick } from '../utils/Haptics';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ConfigType } from '../data/Data';

// Define your navigation stack param types
type ProjectsStackParamList = {
    ProjectsList: undefined;
    ProjectDetail: {
        name: string;
        desc: string;
        url: string;
        config: ConfigType;
    };
};

const TERM = 'Fall 2023';

// Use proper typing from the stack
type Props = NativeStackScreenProps<ProjectsStackParamList, 'ProjectDetail'>;

export default function ProjectDetail({ route, navigation }: Props) {
    const { name, desc, url, config } = route.params;
    const { colors } = useTheme();
    return (
        <>
            <Appbar.Header elevated>
                <Appbar.BackAction color={colors.primary} onPress={() => {
                    navigation.goBack();
                    contextClick();
                }} />
                <Appbar.Content title={name.split(" ")[0]} />
            </Appbar.Header>
            <ScrollView style={{
                padding: 20,
                flex: 1,
                backgroundColor: colors.background
            }}>
                <View style={{ padding: 10, marginBottom: 20 }}>
                    <Text variant='headlineLarge'>{name}</Text>
                    {config?.subTitleEnabled && <Text variant="headlineSmall" style={{ fontStyle: 'italic' }}>Wilfrid Laurier University - {TERM}</Text>}
                    <Card style={{ marginTop: 20, marginBottom: 20 }}>
                        <Card.Title
                            title="Overview"
                            titleVariant="titleLarge" // slightly larger built-in style
                            left={(props) => (
                                <MaterialIcons
                                    name="summarize"
                                    color={colors.primary}
                                    {...props} // uses correct size, color, margin
                                />
                            )}
                        />
                        <Card.Content>
                            <Divider style={{ marginBottom: 10 }} />
                            <Surface style={{ padding: 16 }} elevation={2}>
                                <Text variant='bodyMedium'>{desc}</Text>
                            </Surface>
                        </Card.Content>
                    </Card>
                    {config.topicsEnabled && <Card style={{ marginTop: 20, marginBottom: 20 }}>
                        <Card.Title
                            title="Topics"
                            titleVariant="titleLarge" // slightly larger built-in style
                            left={(props) => (
                                <Icon source="folder-text" color={colors.primary} {...props} />
                            )}
                        />
                        <Card.Content>
                            <Divider style={{ marginBottom: 10 }} />
                            <Surface elevation={2}>
                                <List.AccordionGroup>
                                    <List.Accordion title={"Programming fundamentals"} id="1" style={{ backgroundColor: colors.elevation.level2, flexWrap: 'wrap' }} left={(props) => <List.Icon icon="head-cog" color={colors.primary} style={props.style} />}>
                                        <List.Item title="- Variant and Data types" titleNumberOfLines={2} />
                                        <List.Item title="- Control Structures (if-else, loops)" titleNumberOfLines={2} />
                                        <List.Item title="- Functions" />
                                    </List.Accordion>
                                    <Divider />
                                    <List.Accordion title={"Core Python Features"} id="2" style={{ backgroundColor: colors.elevation.level2 }} left={(props) => <List.Icon icon="code-tags" color={colors.primary} style={props.style} />}>
                                        <List.Item title="- Lists, Tuples and Dictionaries" />
                                        <List.Item title="- File I/O" />
                                        <List.Item title="- Error Handling" />
                                    </List.Accordion>
                                    <Divider />
                                    <List.Accordion title={"Basic Algorithms"} id="3" style={{ backgroundColor: colors.elevation.level2 }} left={(props) => <List.Icon icon="chart-timeline-variant-shimmer" color={colors.primary} style={props.style} />}>
                                        <List.Item title="- Basic Algorithms (Searching, Sorting)" titleNumberOfLines={2} />
                                    </List.Accordion>
                                </List.AccordionGroup>
                            </Surface>
                        </Card.Content>
                    </Card>}
                    {config.technologiesEnabled && <Card elevation={2} style={{ marginTop: 20, marginBottom: 20 }}>
                        <Card.Title
                            title="Technologies"
                            titleVariant="titleLarge" // slightly larger built-in style
                            left={(props) => (
                                <Icon source="laptop" color={colors.primary} {...props} />
                            )}
                        />
                        <Card.Content>
                            <Divider style={{ marginBottom: 10 }} />
                            <Surface elevation={2} style={{ padding: 10 }}>
                                <List.Section style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <List.Icon icon="code-tags" color={colors.primary} style={{ marginRight: 8 }} />
                                    <Text style={{ fontWeight: 'bold' }}>Programming Language: </Text>
                                    <Text>Python</Text>
                                </List.Section>
                                <Divider />
                                <List.Section style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <List.Icon icon="console" color={colors.primary} style={{ marginRight: 8 }} />
                                    <Text style={{ fontWeight: 'bold' }}>Development Environment: </Text>
                                    <Text>VS Code (preferred), Eclipse</Text>
                                </List.Section>
                                <Divider />
                                <List.Section style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <List.Icon icon="github" color={colors.primary} style={{ marginRight: 8 }} />
                                    <Text style={{ fontWeight: 'bold' }}>Version Control: </Text>
                                    <Text>Git & GitHub</Text>
                                </List.Section>
                            </Surface>
                        </Card.Content>
                    </Card>}
                    {config.exploreDocsEnabled && <Card elevation={2} style={{ marginTop: 20, marginBottom: 20 }}>
                        <Card.Title
                            title="Explore the Docs"
                            titleVariant="titleLarge" // slightly larger built-in style
                            left={(props) => (
                                <Icon source="text-box" color={colors.primary} {...props} />
                            )}
                        />
                        <Card.Content>
                            <Divider style={{ marginBottom: 10 }} />
                            {config.exploreDocs.assignmentsEnabled && <Card elevation={3} style={{ marginTop: 10, marginBottom: 10 }}>
                                <Card.Title
                                    title="Assignments"
                                    titleVariant="titleLarge" // slightly larger built-in style
                                    left={(props) => (
                                        <Icon source="clipboard-text" color={colors.primary} size={props.size} />
                                    )}
                                />
                                <Card.Content>
                                    <Divider style={{ marginBottom: 10 }} />
                                    <Text>All assignments with generated documentation.</Text>
                                </Card.Content>
                                <Card.Actions>
                                    <Button>View Assignments →</Button>
                                </Card.Actions>
                            </Card>}
                            {config.exploreDocs.labsEnabled && <Card elevation={3} style={{ marginTop: 10, marginBottom: 10 }}>
                                <Card.Title
                                    title="Labs"
                                    titleVariant="titleLarge" // slightly larger built-in style
                                    left={(props) => (
                                        <Icon source="microscope" color={colors.primary} size={props.size} />
                                    )}
                                />
                                <Card.Content>
                                    <Divider style={{ marginBottom: 10 }} />
                                    <Text>Hands-on labs that apply key data structure concepts.</Text>
                                </Card.Content>
                                <Card.Actions>
                                    <Button>View Labs →</Button>
                                </Card.Actions>
                            </Card>}
                            {config.exploreDocs.examplesEnabled && <Card elevation={3} style={{ marginTop: 10, marginBottom: 10 }}>
                                <Card.Title
                                    title="Examples"
                                    titleVariant="titleLarge" // slightly larger built-in style
                                    left={(props) => (
                                        <Icon source="lightbulb" color={colors.primary} size={props.size} />
                                    )}
                                />
                                <Card.Content>
                                    <Divider style={{ marginBottom: 10 }} />
                                    <Text>Mini examples, snippets, and helper code from class.</Text>
                                </Card.Content>
                                <Card.Actions>
                                    <Button>View Examples →</Button>
                                </Card.Actions>
                            </Card>}
                        </Card.Content>
                    </Card>}
                    {config.notesEnabled && <Card elevation={2} style={{ marginTop: 20, marginBottom: 20 }}>
                        <Card.Title
                            title="Notes"
                            titleVariant="titleLarge" // slightly larger built-in style
                            left={(props) => (
                                <Icon source="note-edit" color={colors.primary} size={props.size} />
                            )}
                        />
                        <Card.Content>
                            <Divider style={{ marginBottom: 10 }} />
                            <Text>This repository is for educational use and follows academic policies set by Wilfrid Laurier University. If you're a CP104 student, please ensure your submissions maintain academic integrity.</Text>
                        </Card.Content>
                    </Card>}
                    {config.contactEnabled && <Card elevation={2} style={{ marginTop: 20, marginBottom: 20 }}>
                        <Card.Title
                            title="Contact"
                            titleVariant="titleLarge" // slightly larger built-in style
                            left={(props) => (
                                <Icon source="chat-question" color={colors.primary} size={props.size} />
                            )}
                        />
                        <Card.Content>
                            <Divider style={{ marginBottom: 10 }} />
                            <List.Section style={{ gap: 8 }}>
                                <List.Item
                                    title="My GitHub"
                                    description="Check out my work!"
                                    left={props => <List.Icon color={colors.primary} style={props.style} icon="github" />}
                                    onPress={() => Linking.openURL('https://github.com/mohammadelhsn')}
                                    rippleColor={colors.primary} // light ripple with primary color
                                />
                                <Divider />
                                <List.Item
                                    title="My Email"
                                    left={props => <List.Icon color={colors.primary} style={props.style} icon="email" />}
                                    onPress={() => Linking.openURL('mailto:mohammadelhsn@gmail.com')}
                                    rippleColor={colors.primary} // light ripple with primary color
                                />
                            </List.Section>
                        </Card.Content>
                    </Card>}
                </View>
            </ScrollView>
        </>
    );
}