import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  VStack,
  IconButton,
  HStack,
  Spacer,
  Button,
  Input,
  Center,
  Skeleton,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons'
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';
import { MdHighlightOff } from "react-icons/md";
import ViewAContact from './ViewContact';
import EditContact from './EditContact';
import DeleteContact from './DeleteContact';
import CreateContact from './CreateContact';
import { ContactI } from '../../store/type';

function MobileHome(props: any) {
  const { handleOnChange, searchTerm, handleKeyDown, isLoaded, showClearIcon, clearSearchTerm } = props;
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState<null | ContactI>(null);
  const [contactToDelete, setContactToDelete] = useState<null | ContactI>(null);
  const [selectedContactId, setSelectedContactId] = useState<null | string>(null);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

  useEffect(() => {
    if (props.contacts) {
      setContacts(props.contacts);
    }
  }, [props]);

  return (
    <Box>
      <VStack spacing={4} pt={5} pb={5} align="stretch">
        <Center>
          {/* <Input width={{ base: '70%' }}
            onChange={handleOnChange} value={searchTerm} onKeyDown={handleKeyDown}
            placeholder='Search contacts'
            size='md' variant='filled'
          /> */}
          <InputGroup width='auto'>
              <InputLeftElement
                pointerEvents='none'
                color='gray.300'
                fontSize='0.9em'
                children={<SearchIcon color='gray.500' />}
              />
              <Input
                onChange={handleOnChange} value={searchTerm} onKeyDown={handleKeyDown}
                placeholder='Search Contacts'
                variant='filled'
                size='md'
              />

              {showClearIcon &&
                <InputRightElement
                  onClick={() => clearSearchTerm('')}
                  children={
                    <MdHighlightOff
                      color='green.500'
                    />}
                />}


            </InputGroup>
        </Center>
      </VStack>

      <Skeleton size="20" isLoaded={isLoaded}>
        {contacts.length > 0 ?

          <VStack spacing={4} pt={5} pb={5} align="stretch">-
            <Text fontSize="xl" color="gray.500">
              {contacts.length} Contact(s)
            </Text>
            {contacts.map((contact: ContactI) => (
              <Box
                shadow="md"
                w="100%"
                textAlign="left"
                pl="5"
                py="3"
                borderWidth="1px"
                key={contact._id}
              >
                <HStack>
                  <Box onClick={() => setSelectedContactId(contact._id)}>
                    <Text fontSize="sm">{`${contact.firstName}  ${contact.lastName}`}</Text>
                    <Text fontSize="sm">{contact.email}</Text>
                    <Text fontSize="sm">{contact.phoneNumber}</Text>
                  </Box>
                  <Spacer />
                  <VStack>
                    <IconButton
                      aria-label="Edit Contact"
                      size="sm"
                      variant="link"
                      icon={
                        <GrEdit
                          onClick={() => setContact(contact)}
                        />
                      }
                    />
                    <Spacer />
                    <IconButton
                      colorScheme="red"
                      size="sm"
                      variant="link"
                      aria-label="Delete Contact"
                      icon={
                        <RiDeleteBin6Line
                          onClick={() => setContactToDelete(contact)}
                        />
                      }
                    />
                  </VStack>
                </HStack>
              </Box>
            ))}
          </VStack> :
          <Text fontSize="xl" pt={40} pb={20} color="gray.500">
            No contact found.<br /> Add a new contact to get started.
          </Text>
        }


        <EditContact
          isOpen={contact}
          onClose={() => setContact(null)}
          fullContacts={contacts}
          contact={contact}
          setContact={setContact}

        />

        <CreateContact
          setContact={setContacts}
          contact={contacts}

          isOpen={showCreateForm}
          onClose={() => setShowCreateForm(false)}
        />
        <DeleteContact
          isOpen={contactToDelete}
          onClose={() => setContactToDelete(null)}
          contact={contacts}
          setContact={setContacts}
          contactToDelete={contactToDelete}
        />
        {selectedContactId !== null && (
          <ViewAContact
            isOpen={selectedContactId}
            onClose={() => {
              setSelectedContactId(null);
            }}
            contactId={selectedContactId}
          />
        )}
      </Skeleton>

      <Button mt={6} colorScheme="teal" onClick={() => setShowCreateForm(true)}>
        Add a New Contact
      </Button>
    </Box>
  );
}

export default MobileHome;
