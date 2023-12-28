import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

type EmojiStickerProps = {
	imageSize: number;
	stickerSource: ImageSourcePropType;
};

export default function EmojiSticker({
	imageSize,
	stickerSource,
}: EmojiStickerProps) {
	return (
		<View style={styles.container}>
			<Image
				source={stickerSource}
				style={{ width: imageSize, height: imageSize }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		top: -350,
	},
});
