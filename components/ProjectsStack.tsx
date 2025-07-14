import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProjectsRoute from '../routes/ProjectsRoute';
import ProjectDetail from '../routes/ProjectDetail';
import { ConfigType } from '../data/Data';

type ProjectsStackParamList = {
    ProjectsList: undefined;
    ProjectDetail: { name: string; desc: string; url: string; config: ConfigType; };
};

const Stack = createNativeStackNavigator<ProjectsStackParamList>();

export default function ProjectsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProjectsList"
                options={{ title: 'Projects', headerShown: false }}
            >
                {(props) => (
                    <ProjectsRoute
                        {...props}
                        goToProject={(project) =>
                            props.navigation.navigate('ProjectDetail', {
                                name: project.name,
                                desc: project.desc,
                                url: project.url,
                                config: project.config,
                            })
                        }
                    />
                )}
            </Stack.Screen>
            <Stack.Screen
                name="ProjectDetail"
                component={ProjectDetail}
                options={({ route }) => ({
                    title: route.params?.name ?? 'Project Detail',
                    headerShown: false
                })}
            />
        </Stack.Navigator>
    );
}
