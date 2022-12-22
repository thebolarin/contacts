import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  VStack,
  IconButton,
  HStack,
  Spacer,
  Button,
  Center,
  Skeleton,
} from '@chakra-ui/react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';
import ViewAContact from './ViewContact';
import EditContact from './EditContact';
import DeleteContact from './DeleteContact';
import CreateContact from './CreateContact';
import { ContactI } from '../../store/type';
import SearchForm from '../../components/Form/SearchForm';

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
          <SearchForm
            showClearIcon={showClearIcon}
            clearSearchTerm={clearSearchTerm}
            handleOnChange={handleOnChange}
            handleKeyDown={handleKeyDown}
            searchTerm={searchTerm}
          />
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
