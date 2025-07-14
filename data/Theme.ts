import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import lightColors from './lightScheme.json';
import darkColors from './darkScheme.json';
import blackColors from './blackScheme.json';

export const lightTheme = {
	...MD3LightTheme,
	colors: lightColors.colors,
};

export const darkTheme = {
	...MD3DarkTheme,
	colors: darkColors.colors,
};

export const blackTheme = {
	...MD3DarkTheme,
	colors: blackColors.colors,
};
