import Button from '@components/Button';
import CircleButton from '@components/CircleButton';
import EmojiList from '@components/EmojiList';
import EmojiPicker from '@components/EmojiPicker';
import EmojiSticker from '@components/EmojiSticker';
import IconButton from '@components/IconButton';
import ImageViewer from '@components/ImageViewer';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { captureRef } from 'react-native-view-shot';

import * as MediaLibrary from 'expo-media-library';

const PlaceholderImage = require('@assets/images/background-image.png');

// Só pelo badge

export default function App() {
	const [status, requestPermission] = MediaLibrary.usePermissions();
	if (status === null) requestPermission();

	const imageRef = useRef<any>();

	const [selectedImage, setSelectedImage] = useState<string | undefined>();
	const [showAppOptions, setShowAppOptions] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [pickedEmoji, setPickedEmoji] = useState(null);

	const pickImageAsync = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 1,
		});
		if (!result.canceled) {
			setSelectedImage(result.assets[0].uri);
			setShowAppOptions(true);
		} else alert('You did not select an image');
	};

	const onReset = () => setShowAppOptions(false);
	const onAddSticker = () => setIsModalVisible(true);
	const onModalClose = () => setIsModalVisible(false);
	const onSaveImageAsync = async () => {
		try {
			const localUri = await captureRef(imageRef, {
				height: 440,
				quality: 1,
			});

			await MediaLibrary.saveToLibraryAsync(localUri);
			if (localUri) {
				alert('Saved!');
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<GestureHandlerRootView style={styles.container}>
			<View style={styles.container}>
				<View ref={imageRef} collapsable={false} style={styles.imageContainer}>
					<ImageViewer
						placeholderImageSource={PlaceholderImage}
						selectedImage={selectedImage}
					/>
					{pickedEmoji !== null && (
						<EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
					)}
				</View>
				{showAppOptions ? (
					<View style={styles.optionsContainer}>
						<View style={styles.optionsRow}>
							<IconButton icon="refresh" label="Reset" onPress={onReset} />
							<CircleButton onPress={onAddSticker} />
							<IconButton
								icon="save-alt"
								label="Save"
								onPress={onSaveImageAsync}
							/>
						</View>
					</View>
				) : (
					<View style={styles.footerContainer}>
						<Button
							theme="primary"
							label="Chose a photo"
							onPress={pickImageAsync}
						/>
						<Button
							label="Use this photo"
							onPress={() => setShowAppOptions(true)}
						/>
					</View>
				)}

				<EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
					<EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
				</EmojiPicker>
				<StatusBar style="auto" />
			</View>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#25292e',
		alignItems: 'center',
	},
	imageContainer: {
		flex: 1,
		paddingTop: 58,
	},
	footerContainer: {
		flex: 1 / 3,
		alignItems: 'center',
	},
	optionsContainer: {
		position: 'absolute',
		bottom: 80,
	},
	optionsRow: {
		alignItems: 'center',
		flexDirection: 'row',
	},
});
