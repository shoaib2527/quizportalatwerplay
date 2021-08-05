import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input } from "@chakra-ui/react"
import React from 'react'

const UserForm = ({
    isOpen, onClose = () => { },
    onChangeQuestion = () => { }, question = '',
    onChangeIncorrectAns1 = () => { }, incorrect_answer_1 = '',
    onChangeIncorrectAns2 = () => { }, incorrect_answer_2 = '',
    onChangeIncorrectAns3 = () => { }, incorrect_answer_3 = '',
    onChangeCorrectAns = () => { }, correct_answer = '',
    onSubmit = () => { } }) => {
    return (<Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Edit User Account</DrawerHeader>
            <DrawerBody>
                <Input placeholder="Type Question Here" my={5} value={question} onChange={(val) => onChangeQuestion(val.target.value)} />
                <Input placeholder="Type Correct Answer Here" mb={5} value={correct_answer} onChange={(val) => onChangeCorrectAns(val.target.value)} />
                <Input placeholder="Type Incorrect Answer Here" mb={5} value={incorrect_answer_1} onChange={(val) => onChangeIncorrectAns1(val.target.value)} />
                <Input placeholder="Type Incorrect Answer Here" mb={5} value={incorrect_answer_2} onChange={(val) => onChangeIncorrectAns2(val.target.value)} />
                <Input placeholder="Type Incorrect Answer Here" mb={5} value={incorrect_answer_3} onChange={(val) => onChangeIncorrectAns3(val.target.value)} />
                <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                </Button>
                <Button colorScheme="blue" onClick={onSubmit}>Save</Button>
            </DrawerBody>
            <DrawerFooter>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>)
}
export default UserForm