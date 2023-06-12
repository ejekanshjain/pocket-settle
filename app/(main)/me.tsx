import { View } from 'react-native'
import { Profile } from '../../components/Profile'

export default function Me() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Profile />
    </View>
  )
}
