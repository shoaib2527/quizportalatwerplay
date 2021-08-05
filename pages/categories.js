import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons'
import { Box, Button, Center, Flex, Spinner, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import CatForm from '../components/catForm'
export default function Categories() {
    const router = useRouter()
    const [cats, setCats] = useState([])
    const [loading, setLoading] = useState(true)
    const [formState, setFormState] = useState({
        isVisible: false,
        category: '',
        id: '',
    })
    const getCats = () => {
        setLoading(true)
        fetch('/api/cats')
            .then(r => r.json())
            .then(r => {
                setCats(r.cats)
                setLoading(false)
            }).catch(err => {
                setLoading(false)
                console.log(err)
                alert("Something went wrong.")
            })
    }
    useEffect(() => {
        getCats()
    }, [])
    const deleteUser = (cat) => {
        var r = confirm("Are you sure you want to delete " + cat.category);
        if (r) {
            fetch('/api/cats?id=' + cat.id, {
                method: 'DELETE',
            })
                .then(r => r.json())
                .then(r => {
                    setCats(cats.filter(item => item.id != cat.id))
                }).catch(err => {
                    console.log(err)
                    alert("Something went wrong.")
                })
        }
    }
    const submitEditing = () => {
        let method = "POST"
        let body = {
            category: formState.category
        }
        if (formState.id != '') {
            body = { ...body, id: formState.id }
            method = "PUT"
        }
        fetch('/api/cats', {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
            .then(r => r.json())
            .then(r => {
                let newCats = [...cats]
                if (formState.id != '') {
                    let index = newCats.findIndex(item => item.id == formState.id)
                    if (index > -1) {
                        newCats[index] = { id: formState.id, category: formState.category }
                        setCats(newCats)
                    }
                }
                else {
                    newCats.push(r.data)
                    setCats(newCats)
                }
                setFormState({
                    isVisible: false,
                    category: '',
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
                    <Spinner /></Center> :
                <Box>
                    <Center mb={5}>
                        <Button colorScheme="blue" onClick={() => setFormState({
                            ...formState,
                            category: '',
                            id: '',
                            isVisible: true
                        })}>Add Category</Button>
                    </Center>
                    <Table variant="striped" colorScheme="teal">
                        <TableCaption>Quiz App Users</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Id</Th>
                                <Th>Category</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {cats.map(cat =>
                                <Tr key={cat.id}>
                                    <Td>{cat.id}</Td>
                                    <Td>{cat.category}</Td>
                                    <Td>
                                        <Flex>
                                            <EditIcon cursor="pointer"
                                                onClick={() => setFormState(
                                                    {
                                                        ...formState, isVisible: true,
                                                        id: cat.id, category: cat.category
                                                    })} mx={3} />
                                            <DeleteIcon cursor="pointer" onClick={() => deleteUser(cat)} mx={3} />
                                            <ViewIcon cursor="pointer" onClick={() => router.push('/questions/' + cat.category)} mx={3} />
                                        </Flex>
                                    </Td>
                                </Tr>)}
                        </Tbody>
                    </Table>
                </Box>
            }
            <CatForm isOpen={formState.isVisible} category={formState.category}
                onChangeCategory={(category) => setFormState({ ...formState, category })}
                onClose={() => setFormState({ ...formState, isVisible: false })}
                onSubmit={submitEditing}
            />
        </Box>
    )
}
