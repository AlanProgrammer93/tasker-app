import { TextInput } from 'react-native'
import React from 'react'
import Text from '@kaloraat/react-native-text';

const Input = ({ 
        name, 
        value, 
        setValue, 
        autoCapitalize = "none", 
        autoCorrect = false,
        secureTextEntry = false,
        multiline = false,
        keyboardType = "default",
        color = "#fff"
    }) => {
    return (
        <>
            <Text color={color}>{ name }</Text>
            <TextInput
                value={value}
                onChangeText={text => setValue(text)}
                autoCorrect={autoCorrect}
                autoCapitalize={autoCapitalize}
                secureTextEntry={secureTextEntry}
                //multiline={multiline}
                keyboardType={keyboardType}
                style={{
                    borderBottomWidth: 0.5,
                    height: 48,
                    borderBottomColor: "#8e93a1",
                    marginBottom: 30,
                    color,
                }}
            />
        </>
    )
}

export default Input