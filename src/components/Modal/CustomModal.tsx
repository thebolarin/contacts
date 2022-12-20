import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useMediaQuery,
} from '@chakra-ui/react';

function CustomModal(props: any) {
  const { isOpen, onClose, title, children, footerChildren } = props
  const [isMobile] = useMediaQuery('(max-width: 600px)');

  return (
    <>
      <Modal
        size={isMobile ? 'full' : 'md'}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>{footerChildren}</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CustomModal;
