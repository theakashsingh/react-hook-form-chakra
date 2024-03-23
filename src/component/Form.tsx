import { useFieldArray, useForm, Controller } from "react-hook-form";

import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  IconButton,
  Text,
  InputGroup,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import {
  AddIcon,
  CheckIcon,
  CloseIcon,
  TriangleDownIcon,
} from "@chakra-ui/icons";
import { FormValues, optionType } from "../utils/formValuetype";
import { useState } from "react";
import "./CustomOption.css";
import { Select, chakraComponents } from "chakra-react-select";

const Form = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<FormValues>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      tech_stack: [{ stack: "" }],
      dob: new Date(),
      gender: "",
    },
  });

  const { register, handleSubmit, control, formState } = form;
  const { errors, isSubmitted } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "tech_stack",
    control,
  });

  function onSubmit(value: FormValues) {
    console.log("form submitted", value);
    setIsLoading(true);
    new Promise<void>(resolve => {
      setTimeout(() => {
        alert(JSON.stringify(value, null, 2));
        isSubmitted && setIsLoading(false);
        resolve();
      }, 3000);
    });
  }
  console.log({ isLoading });

  const options: optionType[] = [
    {
      value: "male",
      label: "Male",
      icon: <CheckIcon/>,
    },
    {
      value: "female",
      label: "Female",
      icon: <CheckIcon/>,
    },
    {
      value: "others",
      label: "Others",
      icon: <CheckIcon/>,
    },
  ];

  const customOption = {
    Option: ({ children, ...props }) => (
      <chakraComponents.Option {...props}>
        {console.log(props)}
        <Box w={"100%"} display={"flex"} justifyContent={"space-between"}>
          {children}
        </Box>
      </chakraComponents.Option>
    ),
    DropdownIndicator: props => (
      <chakraComponents.DropdownIndicator {...props}>
        <Icon as={TriangleDownIcon} />
      </chakraComponents.DropdownIndicator>
    ),
  };

  return (
    <Box bg={"#F0EBEB"} rounded="lg" p={"40px 20px"}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Text fontSize={"18px"} fontWeight={700} mb={1}>
          Basic Details
        </Text>
        <Box display={"flex"} mb={"20px"} gap={10}>
          {/* first name */}
          <FormControl isInvalid={!!errors.first_name}>
            <FormLabel htmlFor="first_name">First name</FormLabel>
            <Input
              variant={"filled"}
              bg={"#D7D7D7"}
              type="text"
              id="first_name"
              placeholder="First Name"
              {...register("first_name", {
                required: {
                  value: true,
                  message: "First name is required",
                },
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormErrorMessage>
              {errors.first_name && errors.first_name.message}
            </FormErrorMessage>
          </FormControl>
          {/* last name */}
          <FormControl isInvalid={!!errors.last_name}>
            <FormLabel htmlFor="last_name">Last Name</FormLabel>
            <Input
              variant={"filled"}
              bg={"#D7D7D7"}
              type="text"
              id="last_name"
              placeholder="Last Name"
              {...register("last_name", {
                required: {
                  value: true,
                  message: "Last name is required",
                },
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormErrorMessage>
              {errors.last_name && errors.last_name.message}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Text fontSize={"18px"} fontWeight={700} mb={1}>
          Other Information
        </Text>
        <Box display={"flex"} mb={"20px"} gap={10}>
          {/* email */}
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">email</FormLabel>
            <Input
              variant={"filled"}
              bg={"#D7D7D7"}
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", {
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Invalid email address ",
                },
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          {/* date of birth */}
          <FormControl isInvalid={!!errors.dob}>
            <FormLabel htmlFor="dob">Date of birth</FormLabel>
            <Input
              variant={"filled"}
              bg={"#D7D7D7"}
              type="date"
              id="dob"
              {...register("dob", {
                valueAsDate: true,
                required: {
                  value: true,
                  message: "Date of birth required",
                },
              })}
            />
            <FormErrorMessage>
              {errors.dob && errors.dob.message}
            </FormErrorMessage>
          </FormControl>
        </Box>

        <Box display={"flex"} alignItems={"center"} mb={"20px"} gap={10}>
          {/* tech stack */}

          <FormControl isInvalid={!!errors.tech_stack}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mb={1}
            >
              <FormLabel htmlFor="last_name">Tech Stack</FormLabel>{" "}
              <IconButton
                aria-label="Add tech stack"
                icon={<AddIcon />}
                onClick={() => append({ stack: "" })}
                bg={"#F0EBEB"}
              />
            </Box>

            {fields.map((field, index) => (
              <Box key={field.id} display={"flex"} mb={2}>
                <InputGroup>
                  <Input
                    variant={"filled"}
                    bg={"#D7D7D7"}
                    type="text"
                    id={`tech_stack.${index}.stack`}
                    placeholder="Tech Stack"
                    {...register(`tech_stack.${index}.stack` as const)}
                  />
                  {index > 0 && (
                    <InputRightElement>
                      <IconButton
                        bg={"#F0EBEB"}
                        size={"sm"}
                        aria-label="Add tech stack"
                        icon={<CloseIcon />}
                        onClick={() => remove(index)}
                      />
                    </InputRightElement>
                  )}
                </InputGroup>
              </Box>
            ))}
            <FormErrorMessage>
              {errors.tech_stack && errors.tech_stack.message}
            </FormErrorMessage>
          </FormControl>

          {/* Gender */}
          <FormControl isInvalid={!!errors.gender}>
            <FormLabel htmlFor="gender" mb={3}>
              Gender
            </FormLabel>
            <Controller
              control={control}
              name="gender"
              rules={{ required: true }}
              render={({ field, value, ref }) => (
                <Select
                  variant="filled"
                  selectedOptionColorScheme="purple"
                  inputRef={ref}
                  options={options}
                  value={options.find(c => c.value === value)}
                  onChange={val => field.onChange(val.value)}
                  components={customOption}
                />
              )}
            />
          </FormControl>
        </Box>
        <Button
          mt={4}
          colorScheme="teal"
          type="submit"
          isLoading={isLoading}
          bg={"#D7D7D7"}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Form;
