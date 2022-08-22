import { ImageBackground, TextInput, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Text from '@kaloraat/react-native-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios'
import { TaskContext } from '../context/task';

const TaskEdit = ({ navigation }) => {
    const [task, setTask] = useContext(TaskContext);

    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (task) setContent(task?.selected?.task)
	}, [task])

    const handleSubmit = async () => {
		if (!content){
			alert("Please write something")
			return
		}

        try {
            setLoading(true)
            const { data } = await axios.put(`/task/${task?.selected?._id}`, {
                task: content
            })
            if (data.error) {
                alert(data.error)
                setLoading(false)
            } else {
				const newList = task.tasks.map((t) => {
					if (t._id == data._id) {
						return data
					}
					return t
				})

                setTask({...task, tasks: newList})
                alert("Task updated")
                //setContent("")
                //setLoading(false)
                navigation.goBack()
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        try {
            const {data} = await axios.delete(`/task/${task?.selected?._id}`);
            setTask({ ...task, tasks: task.tasks.filter(t => t._id !== data._id) })
            alert("Task deleted")
            navigation.goBack()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
                flexDirection: "column"
            }}
        >
            <View style={{ flex: 1, justifyContent: "center", margin: 20 }}>
                <Text title heavy center style={{ marginBottom: 50 }}>
                    EDIT TASK
                </Text>

                <Input
                    name="Make some changes"
                    value={content}
                    setValue={setContent}
                    color='#333'
                />

                <Button 
                    title="Submit" 
                    loading={loading} 
                    handleSubmit={handleSubmit} 
                />
                <Text style={{ marginVerticle: 10 }}></Text>
                <Button 
                    title="Delete" 
                    loading={loading} 
                    handleSubmit={handleDelete}
                    color="#ff4d4d" 
                />
            </View>
        </KeyboardAwareScrollView>
    )
}

export default TaskEdit