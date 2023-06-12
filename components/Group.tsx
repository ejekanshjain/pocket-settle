import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-paper'

export const Group = (props: any) => {
  const groupId: string = props.route.params.id
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('useEffect', groupId)
  }, [groupId])

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text>Count: {count}</Text>
      <Button
        icon="plus"
        mode="contained-tonal"
        onPress={() => {
          setCount(prev => prev + 1)
        }}
      >
        Increment
      </Button>
    </View>
  )
}
