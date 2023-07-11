"use client";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";

type AdminValidation = { question:string, onNext: Function };

export default function AdminValidation({ question, onNext }: AdminValidation) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleConfirm = () => {
        onNext();
        onClose();
    }

    return (
        <>
            <Button
                rightIcon={<ArrowForwardIcon />}
                onClick={onOpen}
                colorScheme='pink' variant='solid'>
                Let's Vote !
            </Button>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{question}</ModalHeader>
                    <ModalCloseButton />
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleConfirm}>
                            Confirm
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}