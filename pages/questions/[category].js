import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Button, Center, Flex, Spinner, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import QuestionForm from '../../components/questionForm'
export default function Home() {
    const router = useRouter()
    const { category } = router.query
    const [qs, setQs] = useState([])
    const [loading, setLoading] = useState(true)
    const [formState, setFormState] = useState({
        isVisible: false,
        question: '',
        correct_answer: '',
        incorrect_answers: ['', '', ''],
        id: '',
        category,
    })
    const getQs = () => {
        setLoading(true)
        console.log("Cat", category)
        fetch('/api/questions?category=' + category)
            .then(r => r.json())
            .then(r => {
                setQs(r.questions)
                console.log(r)
                setLoading(false)
            }).catch(err => {
                setLoading(false)
                console.log(err)
                alert("Something went wrong.")
            })
    }
    useEffect(() => {
        getQs()
    }, [])
    const deleteQuestion = (question) => {
        var r = confirm("Are you sure you want to delete " + String(question.question).slice(0, 15) + '...');
        if (r) {
            fetch('/api/questions?id=' + question.id, {
                method: 'DELETE',
            })
                .then(r => r.json())
                .then(r => {
                    setQs(qs.filter(item => item.id != question.id))
                }).catch(err => {
                    console.log(err)
                    alert("Something went wrong.")
                })
        }
    }
    const submitEditing = () => {
        let method = "POST"
        let body = {
            category,
            question: formState.question,
            correct_answer: formState.correct_answer,
            incorrect_answers: formState.incorrect_answers
        }
        if (formState.id != '') {
            body = { ...body, id: formState.id }
            method = "PUT"
        }
        fetch('/api/questions', {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
            .then(r => r.json())
            .then(r => {
                let newQs = [...qs]
                if (formState.id != '') {
                    let index = newQs.findIndex(item => item.id == formState.id)
                    if (index > -1) {
                        newQs[index] = { id: formState.id, ...r.data }
                        setQs(newQs)
                    }
                }
                else {
                    newQs.push(r.data)
                    setQs(newQs)
                }
                setFormState({
                    isVisible: false,
                    question: '',
                    correct_answer: '',
                    incorrect_answers: ['', '', ''],
                    id: '',
                    category,
                })
            }).catch(err => {
                console.log(err)
                alert("Something went wrong.")
            })
    }
    const updateIncorrectAns = (ans, index) => {
        let newForm = { ...formState }
        newForm.incorrect_answers[index] = ans
        setFormState(newForm)
    }
    return (
        <Box mx={"5vw"} my={2}>
            {loading ?
                <Center>
                    <Spinner /></Center> :
                <Box>
                    <Center mb={5}>
                        <Button colorScheme="blue" onClick={() => setFormState({
                            question: '',
                            correct_answer: '',
                            incorrect_answers: ['', '', ''],
                            id: '',
                            category, isVisible: true
                        })}>Add New Question</Button>
                    </Center>
                    <Table variant="striped" colorScheme="teal">
                        <TableCaption>Quiz App Users</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Question</Th>
                                <Th>Options</Th>
                                <Th>Correct Answer</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {qs.map(q =>
                                <Tr key={q.id}>
                                    <Td>{q.question}</Td>
                                    <Td>{q.options.join()}</Td>
                                    <Td>{q.correct_answer}</Td>
                                    <Td>
                                        <Flex>
                                            <EditIcon cursor="pointer"
                                                onClick={() => setFormState(
                                                    {
                                                        ...formState, isVisible: true,
                                                        id: q.id, category: q.category,
                                                        question: q.question,
                                                        incorrect_answers: q.incorrect_answers,
                                                        correct_answer: q.correct_answer
                                                    })} mx={3} />
                                            <DeleteIcon cursor="pointer" onClick={() => deleteQuestion(q)} mx={3} />
                                        </Flex>
                                    </Td>
                                </Tr>)}
                        </Tbody>
                    </Table>
                </Box>
            }
            <QuestionForm isOpen={formState.isVisible}
                onChangeQuestion={(question) => setFormState({ ...formState, question })} question={formState.question}
                onChangeCorrectAns={(correct_answer) => setFormState({ ...formState, correct_answer })} correct_answer={formState.correct_answer}
                onChangeIncorrectAns1={(ans) => updateIncorrectAns(ans, 0)} incorrect_answer_1={formState.incorrect_answers[0]}
                onChangeIncorrectAns2={(ans) => updateIncorrectAns(ans, 1)} incorrect_answer_2={formState.incorrect_answers[1]}
                onChangeIncorrectAns3={(ans) => updateIncorrectAns(ans, 2)} incorrect_answer_3={formState.incorrect_answers[2]}
                onClose={() => setFormState({ ...formState, isVisible: false })}
                onSubmit={submitEditing}
            />
        </Box >
    )
}
