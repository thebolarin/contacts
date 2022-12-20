import React, { useState } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import CustomModal from '../../components/Modal/CustomModal';
import CustomForm from '../../components/Form/CustomForm';
import { ContactI } from '../../store/type';

function CreateContact(props:any) {
  const {isOpen, onClose, setContact} = props;
  const [creating, setCreating] = useState<boolean>(false);
  const toast = useToast();

  const onSubmit = async(contact:ContactI) => {
    const baseURL = process.env.REACT_APP_BASE_URL;
   
    try {
      setCreating(true);
      const {data} = await axios.post(`${baseURL}/contact`, contact);

      const spreadData = [data?.data, ...props.contact];
      setContact([...spreadData])

      toast({
        title: 'Success.',
        status: 'success',
        description: 'Contact successfully created.',
        position: 'top',
      });
      setCreating(false);
      onClose();
    } catch (error:any) {
      toast({
        title: 'Oops! Something went wrong.',
        status: 'error',
        description: error.response?.data?.data?.message || error.message,
        position: 'top',
      });
      setCreating(false);
    }
  };

  return (
    <CustomModal
      title="Create Contact"
      isOpen={isOpen}
      onClose={onClose}
      footerChildren={
        <Button
          type="submit"
          size="md"
          form="create-form"
          isLoading={creating}
          colorScheme="teal"
        >
          Submit
        </Button>
      }
    >
      <CustomForm id="create-form" contact = {null} onSubmit={onSubmit} />
    </CustomModal>
  );
}

export default CreateContact;
