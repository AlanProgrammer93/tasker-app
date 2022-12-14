import { Image, ScrollView, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Text from '@kaloraat/react-native-text';
import { TaskContext } from '../context/task';
import axios from 'axios'
import Button from '../components/Button';
import TaskList from '../components/TaskList';

const Tasks = () => {
  const [task, setTask] = useContext(TaskContext);

  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadTasks()
    getTotal()
  }, [])

  useEffect(() => {
    if (page === 1) return
    loadMore()
  }, [page])

  const loadTasks = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/tasks/${page}`)
      setTask({ ...task, tasks: data })
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  const getTotal = async () => {
    try {
      const { data } = axios.get("/task-count");
      setTotal(data)
    } catch (error) {
      console.log(error);
    }
  }

  const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/tasks/${page}`)
      setTask({ ...task, tasks: [...task.tasks, ...data] })
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <View 
        style={{
          alignItems: "center",
          backgroundColor: "#fff",
          height: "100%",
          justifyContent: "center"
        }}
      >
        <Image
          source={require('../assets/loading.gif')}
          style={{ height: 200, width: 200 }}
        />
      </View>
    )
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      
      <TaskList tasks={task?.tasks} loading={loading} />

      <View style={{ margin: 10 }}>
        <Button
          title="Load more"
          disabled={loading}
          handleSubmit={() => setPage(page + 1)}
        />
      </View>
    </ScrollView>
  )
}

export default Tasks