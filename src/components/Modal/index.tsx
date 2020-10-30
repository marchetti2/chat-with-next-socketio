import React, { JSXElementConstructor, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, Button, FormControl, Input, ModalProps,
} from "@chakra-ui/core";

import { Context } from '../../contexts'

const CustomModal = (props: ModalProps) => {
  const { isOpen, onClose } = props

  const inputNameRef = useRef<HTMLInputElement>(null)
  const { setUsername } = Context()

  const handleChangeName = ():void => {
    const name = inputNameRef.current?.value
    if(name){
      setUsername(name)
      return onClose()
    }
  }

  return (
    <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl>
              <Input ref={inputNameRef} maxLength={20} placeholder="Change name" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="ghost" mr={3} onClick={handleChangeName}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}

export {CustomModal}










