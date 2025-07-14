import React from 'react';
import { ScrollView, View } from 'react-native';
import { Appbar, Card, Divider, Icon, Surface, useTheme } from 'react-native-paper';
import Project from '../components/Project';
import { ConfigType } from '../data/Data';

const baseURL = 'https://mohammadelhsn.github.io';

const PROJECTS = [
    {
        name: 'Personal Portfolio Website',
        desc: 'A fully responsive portfolio website showcasing my skills, projects, and contact information. Built with HTML, CSS, and JavaScript.',
        url: baseURL,
        config: {
            subTitleEnabled: false,
            overviewEnabled: true,
            topicsEnabled: true,
            topicsDataEnabled: [],
            technologiesEnabled: true,
            technologiesData: [],
            exploreDocsEnabled: false,
            exploreDocs: {
                assignmentsEnabled: false,
                labsEnabled: false,
                examplesEnabled: false
            },
            notesEnabled: false,
            contactEnabled: false
        }
    },
    {
        name: 'CP104 - Introduction to Programming with Python',
        desc: 'Coursework, assignments, and projects from CP104 at Wilfrid Laurier University. The course covers foundational programming concepts using Python, including variables, control structures, functions, object-oriented programming, and basic algorithms.',
        url: `${baseURL}/CP104`,
        config: {
            subTitleEnabled: true,
            overviewEnabled: true,
            topicsEnabled: true,
            topicsDataEnabled: [],
            technologiesEnabled: true,
            technologiesData: [],
            exploreDocsEnabled: true,
            exploreDocs: {
                assignmentsEnabled: true,
                labsEnabled: true,
                examplesEnabled: false
            },
            notesEnabled: true,
            contactEnabled: true
        }
    },
    {
        name: 'CP164 - Data Structures I with Python',
        desc: 'Fundamental data structures in Python including lists, stacks, queues, and trees, with a focus on algorithm design and efficiency.',
        url: `${baseURL}/CP164`,
        config: {
            subTitleEnabled: true,
            overviewEnabled: true,
            topicsEnabled: true,
            topicsDataEnabled: [],
            technologiesEnabled: true,
            technologiesData: [],
            exploreDocsEnabled: true,
            exploreDocs: {
                assignmentsEnabled: true,
                labsEnabled: true,
                examplesEnabled: false
            },
            notesEnabled: true,
            contactEnabled: true
        }
    },
    {
        name: 'CP213 - Object-Oriented Programming with Java',
        desc: 'Java-based projects exploring object-oriented principles such as inheritance, polymorphism, interfaces, and GUI development.',
        url: `${baseURL}/CP213`,
        config: {
            subTitleEnabled: true,
            overviewEnabled: true,
            topicsEnabled: true,
            topicsDataEnabled: [],
            technologiesEnabled: true,
            technologiesData: [],
            exploreDocsEnabled: true,
            exploreDocs: {
                assignmentsEnabled: true,
                labsEnabled: true,
                examplesEnabled: false
            },
            notesEnabled: true,
            contactEnabled: true
        }
    },
    {
        name: 'CP216 - Introduction to Microprocessors',
        desc: 'Coursework and projects focused on microprocessor systems using ARMv7, covering assembly programming, memory, and embedded systems.',
        url: `${baseURL}/CP216`,
        config: {
            subTitleEnabled: true,
            overviewEnabled: true,
            topicsEnabled: true,
            topicsDataEnabled: [],
            technologiesEnabled: true,
            technologiesData: [],
            exploreDocsEnabled: true,
            exploreDocs: {
                assignmentsEnabled: true,
                labsEnabled: true,
                examplesEnabled: false
            },
            notesEnabled: true,
            contactEnabled: true
        }
    },
    {
        name: 'CP264 - Data Structures II with C',
        desc: 'Advanced data structures and algorithms in C, including trees, hashing, recursion, graphs, and algorithm analysis.',
        url: `${baseURL}/CP264`,
        config: {
            subTitleEnabled: true,
            overviewEnabled: true,
            topicsEnabled: true,
            topicsDataEnabled: [],
            technologiesEnabled: true,
            technologiesData: [],
            exploreDocsEnabled: true,
            exploreDocs: {
                assignmentsEnabled: true,
                labsEnabled: true,
                examplesEnabled: true
            },
            notesEnabled: true,
            contactEnabled: true
        }
    },
    {
        name: 'API-TS',
        desc: 'A very simple API using Express and Typescript',
        url: `https://github.com/mohammadelhsn/API-TS`,
        config: {
            subTitleEnabled: false,
            overviewEnabled: true,
            topicsEnabled: true,
            topicsDataEnabled: [],
            technologiesEnabled: true,
            technologiesData: [],
            exploreDocsEnabled: false,
            exploreDocs: {
                assignmentsEnabled: false,
                labsEnabled: false,
                examplesEnabled: false
            },
            notesEnabled: false,
            contactEnabled: false
        }
    },
];

type ProjectType = {
    name: string;
    desc: string;
    url: string;
    config: ConfigType;
};

type Props = {
    goToProject: (project: ProjectType) => void;
};

export default function ProjectsRoute({ goToProject }: Props) {
    const { colors } = useTheme();
    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Appbar.Header elevated={true}>
                <Appbar.Content title="Projects" />
            </Appbar.Header>
            <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: colors.background }}>
                <Card elevation={1}>
                    <Card.Title title="My Projects" titleVariant='headlineSmall' left={(props) => <Icon source="folder-multiple" color={colors.primary} size={props.size} />} />
                    <Card.Content>
                        <Divider style={{ marginTop: 10, marginBottom: 20 }} />
                        {PROJECTS.map((proj, index) => (
                            <View key={index} style={{ marginBottom: 20 }}>
                                <Project
                                    name={proj.name}
                                    desc={proj.desc}
                                    url={proj.url}
                                    config={proj.config}
                                    onPress={() => goToProject(proj)}
                                />
                            </View>
                        ))}
                    </Card.Content>
                </Card>
            </ScrollView>
        </View>
    );
}