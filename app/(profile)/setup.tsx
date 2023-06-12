import { View } from 'react-native'
import { Profile } from '../../components/Profile'

export default function Setup() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Profile />
    </View>
  )
}
