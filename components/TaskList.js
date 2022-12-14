import { TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import Text from '@kaloraat/react-native-text';
import MasonryList from '@react-native-seoul/masonry-list'
import { AuthContext } from '../context/auth';
import { useNavigation } from '@react-navigation/native';
import { TaskContext } from '../context/task';
import useSearch from '../hooks/useSearch';

const TaskList = ({tasks, loading}) => {
	const [auth, setAuth] = useContext(AuthContext);
	const [task, setTask] = useContext(TaskContext);

	const navigation = useNavigation();
	const { keyword, setKeyword, filteredTasks } = useSearch()

	const owner = (item) => auth?.user?._id === item?.postedBy?._id

	const handlePress = (item) => {
		if (!owner(item)) return
		setTask({ ...task, selected: item })
		navigation.navigate("TaskEdit")
	}

	return (
		<>
			<TextInput 
				style={{
					height: 50,
					paddingHorizontal: 20,
					marginHorizontal: 15,
					marginTop: 10,
					borderRadius: 50,
					borderWidth: 5,
					borderColor: "#d9d9d9",
					backgroundColor: "#e6e6e6"
				}}
				value={keyword}
				onChangeText={text => setKeyword(text)}
				placeholder="Search"
				autoCapitalize='none'
			/>
			<MasonryList 
				data={filteredTasks}
				keyExtractor={(item) => item._id}
				numColumns={2}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => handlePress(item)}
						style={{
							backgroundColor: owner(item) ? '#66ff66' : '#433362',
							margin: 10,
							padding: 50,
							borderRadius: 24
						}}
					>
						<Text color={owner(item) ? '#000' : '#fff'}>{item?.task}</Text>
					</TouchableOpacity>
				)}
			/>
		</>
	)
}

export default TaskList