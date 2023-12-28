import { useState } from 'react';
import { FlatList, Image, Platform, Pressable, StyleSheet } from 'react-native';

type EmojiListProps = {
	onSelect: React.Dispatch<React.SetStateAction<null>>;
	onCloseModal: () => void;
};

export default function EmojiList({ onSelect, onCloseModal }: EmojiListProps) {
	const [emoji] = useState([
		require('@assets/images/emoji/emoji1.png'),
		require('@assets/images/emoji/emoji2.png'),
		require('@assets/images/emoji/emoji3.png'),
		require('@assets/images/emoji/emoji4.png'),
		require('@assets/images/emoji/emoji5.png'),
		require('@assets/images/emoji/emoji6.png'),
	]);

	return (
		<FlatList
			horizontal={true}
			data={emoji}
			showsHorizontalScrollIndicator={Platform.OS === 'web'}
			contentContainerStyle={styles.listContainer}
			renderItem={({ item, index }) => (
				<Pressable
					onPress={() => {
						onSelect(item);
						onCloseModal();
					}}
				>
					<Image source={item} style={styles.image} key={index} />
				</Pressable>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	listContainer: {
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		paddingHorizontal: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	image: {
		width: 100,
		height: 100,
		marginRight: 20,
	},
});
