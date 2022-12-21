import React, { useEffect, useState, useCallback } from 'react';
import {
  useMediaQuery,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  IconButton,
  useToast,
  Button,
  Flex,
  Box,
  Text,
  Skeleton,
  Input,
  Stack
} from '@chakra-ui/react';
import axios from 'axios';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';
import MobileHome from './MobileHome';
import DeleteAlertModal from './DeleteContact';
import ViewAContact from './ViewContact';
import CreateContact from './CreateContact';
import EditContact from './EditContact';
import { ContactI } from '../../store/type';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState<null | ContactI>(null);
  const [contactToDelete, setContactToDelete] = useState<null | ContactI>(null);
  const [selectedContactId, setSelectedContactId] = useState<null | string>(null);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const toast = useToast();
  const [isSearching, setIsSearching] = useState(false);

  const [isBigScreen] = useMediaQuery('(min-width: 768px)');

  const getContacts = useCallback(async (searchTerm: string) => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    try {
      setIsSearching(false);
      setIsLoadingContacts(true);
      let url = `${baseURL}/contact`;
      if (searchTerm && searchTerm !== '')  url = `${baseURL}/contact?searchTerm=${searchTerm}`;
      const response = await axios.get(url);
      const contacts = response.data.data.contacts;

      setContacts(contacts);
      setIsLoadingContacts(false);
    } catch (error: any) {
      toast({
        title: 'Oops! Something went wrong.',
        status: 'error',
        description: error.response?.data?.message || error.message,
        position: 'top',
      });
      setIsLoadingContacts(false);
      console.error(error);
    }
  }, [toast]);

  useEffect(() => { getContacts(searchTerm) }, []);

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      getContacts(searchTerm);
    }
  };


  const handleOnChange = (event: any) => setSearchTerm(event.target.value);


  if (isBigScreen) {
    return (
      <Stack padding={4} spacing={1}>

        <Box>
          <Flex justifyContent="flex-end">
            <Button onClick={() => setShowCreateForm(true)}
              w={200}
              colorScheme="teal"
            >
              Add a New Contact
            </Button>
          </Flex>

          <Flex justifyContent="" mt={4}>
            <Input width='auto' onChange={handleOnChange} value={searchTerm} onKeyDown={handleKeyDown}
              placeholder='search contacts'
              _placeholder={{ color: 'inherit' }}
              variant='filled'
              size='md'
            />
          </Flex>
        </Box>
        <Skeleton size="20" isLoaded={!isLoadingContacts}>
          <Box mx={12} mt={4}>
            <TableContainer>


              {contacts.length > 0 && (
                <Table variant="striped" colorScheme="teal">
                  <TableCaption placement="top">
                    <Text fontSize="3xl">{contacts.length} Contact(s) </Text>
                  </TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Email</Th>
                      <Th>Phone Number</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {contacts.map((contact: ContactI) => (
                      <Tr key={contact._id}>
                        <Td>{`${contact.firstName}  ${contact.lastName}`}</Td>
                        <Td>{contact.email}</Td>
                        <Td>{contact.phoneNumber}</Td>
                        <Td>
                          <IconButton
                            aria-label="Edit Contact"
                            size="sm"
                            variant="link"
                            icon={
                              <GrEdit
                                onClick={() => {
                                  setContact(contact);
                                }}
                              />
                            }
                          />
                          <IconButton
                            colorScheme="red"
                            size="sm"
                            variant="link"
                            aria-label="Delete Contact"
                            icon={
                              <RiDeleteBin6Line
                                onClick={() => {
                                  setContactToDelete(contact);
                                }}
                              />
                            }
                          />
                        </Td>
                        <Td>
                          <Button
                            variant="link"
                            onClick={() => {
                              setSelectedContactId(contact._id);
                            }}
                          >
                            Details
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}
            </TableContainer>
            <EditContact
              isOpen={contact}
              onClose={() => {
                setContact(null);
              }}
              fullContacts={contacts}
              contact={contact}
              setContact={setContact}
            />
            <CreateContact
              setContact={setContacts}
              isOpen={showCreateForm}
              onClose={() => {
                setShowCreateForm(false);
              }}
              contact={contacts}
            />
            <DeleteAlertModal
              setContact={setContacts}
              contact={contacts}
              isOpen={contactToDelete}
              onClose={() => {
                setContactToDelete(null);
              }}
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
          </Box>
        </Skeleton>
      </Stack>

    );
  }
  return (
    <Skeleton size="20" isLoaded={!isLoadingContacts}>
      <MobileHome contacts={contacts} handleOnChange={handleOnChange} handleKeyDown={handleKeyDown} getContacts={getContacts} />
    </Skeleton>
  );
}

export default Home;