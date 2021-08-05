import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input } from "@chakra-ui/react"
import React from 'react'

const CatForm = ({
    isOpen, onClose = () => { },
    onChangeCategory = () => { }, category = '',
    onSubmit = () => { } }) => {
    return (<Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create Quiz Category</DrawerHeader>
            <DrawerBody>
                <Input placeholder="Type Category Name here" my={5} value={category} onChange={(val) => onChangeCategory(val.target.value)} />
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
export default CatForm