import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export function contextClick(style: 'light' | 'medium' | 'heavy' = 'medium') {
	const iosStyle = {
		light: Haptics.ImpactFeedbackStyle.Light,
		medium: Haptics.ImpactFeedbackStyle.Medium,
		heavy: Haptics.ImpactFeedbackStyle.Heavy,
	};

	if (Platform.OS == 'android') {
		Haptics.performAndroidHapticsAsync(
			Haptics.AndroidHaptics.Context_Click
		).catch(() => {});
	} else if (Platform.OS == 'ios') {
		Haptics.impactAsync(iosStyle[style]).catch(() => {});
	}
	return;
}

export function selectionFeedback() {
	if (Platform.OS == 'android') {
		Haptics.performAndroidHapticsAsync(
			Haptics.AndroidHaptics.Context_Click
		).catch(() => {});
	} else if (Platform.OS == 'ios') {
		Haptics.selectionAsync().catch(() => {});
	}
}
