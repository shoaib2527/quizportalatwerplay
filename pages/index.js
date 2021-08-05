import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Center, Flex, Spinner, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import UserForm from '../components/userForm'
export default function Home() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [formState, setFormState] = useState({
    isVisible: false,
    isNew: false,
    email: '',
    userName: ''
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
              <Tr>
                <Td>{user.id}</Td>
                <Td>{user.userName}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <Flex>
                    <EditIcon cursor="pointer" onClick={() => setFormState({ ...formState, isVisible: true })} mx={3} />
                    <DeleteIcon mx={3} />
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
        onSubmit={() => setFormState({ ...formState, isVisible: false })}
      />
    </Box>
  )
}
