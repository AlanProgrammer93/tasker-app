import { View } from 'react-native'
import React, { useContext } from 'react'
import Text from '@kaloraat/react-native-text';
import { TaskContext } from '../context/task';

const Tasks = () => {
  const [task, setTask] = useContext(TaskContext);

  return (
    <View>
      <Text>Tasks</Text>
    </View>
  )
}

export default Tasks