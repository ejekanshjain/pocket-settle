import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
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

  console.log({ members, expenses, transfers })

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Button mode="contained-tonal">Click here</Button>
    </View>
  )
}
