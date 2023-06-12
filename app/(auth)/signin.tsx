import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { useRef, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { fireauth } from '../../lib/firebase'

export default function SignIn() {
  const [type, setType] = useState<'Sign In' | 'Sign Up'>('Sign In')
  const [input, setInput] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  const passwordRef = useRef<TextInput>(null)

  const handleAuth = async () => {
    if (!input.email) return alert('Email is required')
    if (!input.password) return alert('Password is required')

    setLoading(true)

    if (type === 'Sign In') {
      try {
        await signInWithEmailAndPassword(fireauth, input.email, input.password)
        setInput({ email: '', password: '' })
      } catch (err) {
        alert('Invalid email or password')
      }
    } else {
      try {
        await createUserWithEmailAndPassword(
          fireauth,
          input.email,
          input.password
        )
        setInput({ email: '', password: '' })
      } catch (err) {
        alert('Failed to create account')
      }
    }

    setLoading(false)
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{
          width: 240,
          borderColor: 'black',
          borderWidth: 1
        }}
        textContentType="emailAddress"
        keyboardType="email-address"
        autoComplete="email"
        placeholder="Enter email"
        returnKeyType="next"
        value={input.email}
        onChangeText={text =>
          setInput(prev => ({
            ...prev,
            email: text.toLowerCase().trim()
          }))
        }
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <TextInput
        style={{
          width: 240,
          borderColor: 'black',
          borderWidth: 1
        }}
        textContentType="password"
        secureTextEntry={true}
        placeholder="Enter password"
        returnKeyType="done"
        ref={passwordRef}
        value={input.password}
        onChangeText={text =>
          setInput(prev => ({
            ...prev,
            password: text
          }))
        }
        onSubmitEditing={handleAuth}
      />
      <TouchableOpacity disabled={loading} onPress={handleAuth}>
        <Text>{type}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={loading}
        onPress={() =>
          setType(prev => (prev === 'Sign In' ? 'Sign Up' : 'Sign In'))
        }
      >
        <Text>
          {type === 'Sign In' ? 'Create new account?' : 'Already have account?'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
