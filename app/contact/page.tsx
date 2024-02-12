"use client";
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, FocusEvent, useState } from "react";
import { sendContactForm } from "../../lib/api"; // Go up one level from 'contact' to the root, then into 'lib'
// Ensure this path matches your project structure

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormState {
  isLoading: boolean;
  error: string;
  values: FormValues;
}

interface TouchedFields {
  [key: string]: boolean;
}

const initValues: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const initState: FormState = {
  isLoading: false,
  error: "",
  values: initValues,
};

export default function Home() {
  const toast = useToast();
  const [state, setState] = useState<FormState>(initState);
  const [touched, setTouched] = useState<TouchedFields>({});

  const { values, isLoading, error } = state;

  const onBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [e.target.name]: e.target.value,
      },
    }));

  const onSubmit = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      await sendContactForm(values); // Replace with your actual function to send form data
      setTouched({});
      setState(initState);
      toast({
        title: "Message sent.",
        description: "We have received your message.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      }));
    }
  };

  return (
    <Container maxW="450px" mt={12}>
      <Heading mb={6}>Contact Us</Heading>
      {error && (
        <Text color="red.500" mb={4}>
          Error: {error}
        </Text>
      )}
      <FormControl isInvalid={!!touched.name && !values.name} mb={4}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage>Name is required.</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!touched.email && !values.email} mb={4}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage>Email is required.</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!touched.subject && !values.subject} mb={4}>
        <FormLabel htmlFor="subject">Subject</FormLabel>
        <Input
          id="subject"
          name="subject"
          value={values.subject}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage>Subject is required.</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!touched.message && !values.message} mb={4}>
        <FormLabel htmlFor="message">Message</FormLabel>
        <Textarea
          id="message"
          name="message"
          value={values.message}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage>Message is required.</FormErrorMessage>
      </FormControl>

      <Button
        colorScheme="blue"
        isLoading={isLoading}
        isDisabled={
          !values.name || !values.email || !values.subject || !values.message
        }
        onClick={onSubmit}
      >
        Submit
      </Button>
    </Container>
  );
}
