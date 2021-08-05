import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input } from "@chakra-ui/react"
import React from 'react'

const UserForm = ({
    isOpen, onClose = () => { },
    onChangeEmail = () => { }, email = '',
    onChangeUserName = () => { }, userName = '',
    onSubmit = () => { } }) => {
    return (<Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>
            <DrawerBody>
                <Input placeholder="Type Email Address" my={5} value={email} onChange={(val) => onChangeEmail(val.target.value)} />
                <Input placeholder="Type User Name Here" mb={5} value={userName} onChange={(val) => onChangeUserName(val.target.value)} />
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