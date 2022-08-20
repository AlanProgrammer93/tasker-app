import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import Text from '@kaloraat/react-native-text';

const Button = ({ title, loading, handleSubmit }) => {
  return (
    <TouchableOpacity
      onPress={handleSubmit}
        style={{
            backgroundColor: "#433362",
            height: 50,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 24,
        }}
    >
        <Text bold medium center color="#fff">
            { loading ? "Please wait..." : title }
        </Text>
    </TouchableOpacity>
  )
}

export default Button