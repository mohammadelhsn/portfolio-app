import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = 'portfolio:settings:theme';
const THEME_OLED_VIEWED = 'portfolio:settings:theme:oledViewed';

export async function getData(key: string) {
	try {
		const savedData = await AsyncStorage.getItem(key);
		return savedData;
	} catch (error) {
		console.error(error);
	}
}

export async function storeData(key: string, data: string) {
	try {
		await AsyncStorage.setItem(key, data);
	} catch (e) {
		console.error(e);
	}
}

export async function getTheme(): Promise<'light' | 'dark' | 'black' | null> {
	return (await getData(THEME_STORAGE_KEY)) as
		| 'light'
		| 'dark'
		| 'black'
		| null;
}

export async function storeTheme(
	theme: 'light' | 'dark' | 'black'
): Promise<void> {
	await storeData(THEME_STORAGE_KEY, theme);
}

export async function getOledViewed(): Promise<boolean> {
	return (await getData(THEME_OLED_VIEWED)) == 'true' ? true : false;
}

export async function setOledViewed(value: boolean): Promise<void> {
	await storeData(THEME_OLED_VIEWED, `${value}`);
}
