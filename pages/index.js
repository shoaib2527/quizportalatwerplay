import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Center, Flex, Spinner, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import UserForm from '../components/userForm'
export default function Home() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [formState, setFormState] = useState({
    isVisible: false,
    email: '',
    userName: '',
    id: '',
  })
  const getUsers = () => {
    setLoading(true)
    fetch('/api/users')
      .then(r => r.json())
      .then(r => {
        console.log(r)
        setUsers(r.users)
        setLoading(false)
      }).catch(err => {
        setLoading(false)
        console.log(err)
        alert("Something went wrong.")
      })
  }
  useEffect(() => {
    getUsers()
  }, [])
  const deleteUser = (user) => {
    var r = confirm("Are you sure you want to delete " + user.userName);
    if (r) {
      fetch('/api/users?id=' + user.id, {
        method: 'DELETE',
      })
        .then(r => r.json())
        .then(r => {
          setUsers(users.filter(item => item.id != user.id))
        }).catch(err => {
          console.log(err)
          alert("Something went wrong.")
        })
    }
  }
  const submitEditing = () => {
    fetch('/api/users', {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: formState.id,
        userName: formState.userName,
        email: formState.email
      })
    })
      .then(r => r.json())
      .then(r => {
        let newUsers = [...users]
        let index = newUsers.findIndex(item => item.id == formState.id)
        if (index > -1) {
          newUsers[index] = { id: formState.id, userName: formState.userName, email: formState.email }
          setUsers(newUsers)
        }
        setFormState({
          isVisible: false,
          email: '',
          userName: '',
          id: '',
        })
      }).catch(err => {
        console.log(err)
        alert("Something went wrong.")
      })
  }
  return (
    <Box mx={"5vw"} my={2}>
      {loading ?
        <Center>
          <Spinner /></Center> : <Table variant="striped" colorScheme="teal">
          <TableCaption>Quiz App Users</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>User Name</Th>
              <Th>Email</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map(user =>
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.userName}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <Flex>
                    <EditIcon cursor="pointer" onClick={() => setFormState({ ...formState, isVisible: true, id: user.id, email: user.email, userName: user.userName })} mx={3} />
                    <DeleteIcon cursor="pointer" onClick={() => deleteUser(user)} mx={3} />
                  </Flex>
                </Td>
              </Tr>)}
          </Tbody>
        </Table>
      }
      <UserForm isOpen={formState.isVisible} email={formState.email} userName={formState.userName}
        onChangeEmail={(email) => setFormState({ ...formState, email })}
        onChangeUserName={(userName) => setFormState({ ...formState, userName })}
        onClose={() => setFormState({ ...formState, isVisible: false })}
        onSubmit={submitEditing}
      />
    </Box>
  )
}
