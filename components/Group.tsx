import { addDoc, collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Button, List, Modal, Portal, TextInput } from 'react-native-paper'
import { firestore } from '../lib/firebase'

type Member = {
  id: string
  name: string
  userId?: string
}

type Expense = {
  id: string
  description?: string
  amount: number
  paidBy: string
  paidFor: {
    memberId: string
    amount: number
  }[]
}

type Transfer = {
  id: string
  description?: string
  amount: number
  from: string
  to: string
}

export const Group = (props: any) => {
  const groupId: string = props.route.params.id
  const [members, setMembers] = useState<Member[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [transfers, setTransfers] = useState<Transfer[]>([])
  const [membersModal, setMembersModal] = useState(false)
  const [newMemberName, setNewMemberName] = useState('')

  useEffect(() => {
    const unsubscribeMembers = onSnapshot(
      collection(firestore, 'groups', groupId, 'members'),
      snap => {
        const members: Member[] = []
        snap.forEach(s => {
          const data = s.data()
          if (!data) return
          members.push({
            id: s.id,
            name: data.name,
            userId: data.userId
          })
        })
        setMembers(members)
      }
    )

    const unsubscribeExpenses = onSnapshot(
      collection(firestore, 'groups', groupId, 'expenses'),
      snap => {
        const expenses: Expense[] = []
        snap.forEach(s => {
          const data = s.data()
          if (!data) return
          expenses.push({
            id: s.id,
            description: data.description,
            amount: data.amount,
            paidBy: data.paidBy,
            paidFor: data.paidFor
          })
        })
        setExpenses(expenses)
      }
    )

    const unsubscribeTransfers = onSnapshot(
      collection(firestore, 'groups', groupId, 'transfers'),
      snap => {
        const transfers: Transfer[] = []
        snap.forEach(s => {
          const data = s.data()
          if (!data) return
          transfers.push({
            id: s.id,
            description: data.description,
            amount: data.amount,
            from: data.from,
            to: data.to
          })
        })
        setTransfers(transfers)
      }
    )

    return () => {
      unsubscribeMembers()
      unsubscribeExpenses()
      unsubscribeTransfers()
    }
  }, [groupId])

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Button mode="contained-tonal" onPress={() => setMembersModal(true)}>
        Members
      </Button>
      <Portal>
        <Modal
          visible={membersModal}
          onDismiss={() => setMembersModal(false)}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20
          }}
        >
          <TextInput
            label="Add new member"
            mode="outlined"
            value={newMemberName}
            onChangeText={text => {
              setNewMemberName(text)
            }}
          />
          <Button
            mode="contained-tonal"
            onPress={() => {
              if (!newMemberName.trim()) return
              addDoc(collection(firestore, 'groups', groupId, 'members'), {
                name: newMemberName.trim()
              })
              setNewMemberName('')
            }}
          >
            Add
          </Button>
          <FlatList
            data={members}
            renderItem={item => (
              <List.Item
                title={item.item.name}
                titleStyle={{
                  color: 'black'
                }}
              />
            )}
          />
        </Modal>
      </Portal>
    </View>
  )
}
