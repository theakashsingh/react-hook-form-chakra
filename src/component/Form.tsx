import {
  useFieldArray,
  // useForm,
  Controller,
  useFormContext,
} from "react-hook-form";

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
import { Select, chakraComponents } from "chakra-react-select";
import { JSX } from "react/jsx-runtime";

const Form = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, handleSubmit, control, formState } =
    useFormContext<FormValues>();
  // const form = useForm<FormValues>({
  //   defaultValues: {
  //     first_name: "",
  //     last_name: "",
  //     email: "",
  //     tech_stack: [{ stack: "" }],
  //     dob: new Date(),
  //     gender: "",
  //   },
  // });

  // const { register, handleSubmit, control, formState } = form;
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "tech_stack",
    control,
  });

  function onSubmit(value: FormValues) {
    console.log("form submitted", value);
    setIsLoading(true);
    new Promise<void>(resolve => {
      setTimeout(() => {
        setIsLoading(false);
        resolve();
      }, 3000);
    });
  }

  const options: optionType[] = [
    {
      value: "male",
      label: "Male",
      icon: <CheckIcon />,
    },
    {
      value: "female",
      label: "Female",
      icon: <CheckIcon />,
    },
    {
      value: "others",
      label: "Others",
      icon: <CheckIcon />,
    },
  ];


  interface OptionProps {
    children: React.ReactNode; // Explicitly typing children prop
    isSelected: boolean; // Assuming isSelected is a boolean prop
    data: { icon: React.ReactNode }; // Assuming data is an object with an icon prop of React.ReactNode type
  }
  const customOption = {
    Option: ({ children, ...props }: OptionProps) => (
      <chakraComponents.Option {...props}>
        <Box
          w={"100%"}
          display={"flex"}
          cursor={"pointer"}
          justifyContent={"space-between"}
        >
          {children} {props.isSelected && props.data.icon}
        </Box>
      </chakraComponents.Option>
    ),
    DropdownIndicator: (props: JSX.IntrinsicAttributes) => (
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
                minLength: {
                  value: 4,
                  message: "Minimum length should be 4",
                },
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
                minLength: {
                  value: 4,
                  message: "Minimum length should be 4",
                },
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
              rules={{
                required: { value: true, message: "Gender is required" },
              }}
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  variant="filled"
                  selectedOptionColorScheme="#D7D7D7"
                  inputRef={ref}
                  options={options}
                  value={options.find(c => c.value === value)}
                  onChange={(val: { value: string }) => onChange(val.value)}
                  components={customOption}
                />
              )}
            />
            <FormErrorMessage>
              {errors.gender && errors.gender.message}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box display={"flex"} justifyContent={"flex-end"} mt={10}>
          <Button
            mt={4}
            colorScheme="teal"
            type="submit"
            isLoading={isLoading}
            bg={"#D7D7D7"}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Form;
