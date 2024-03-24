import { Box, Text } from "@chakra-ui/react";
import Form from "./component/Form";
import DisplayData from "./component/DisplayData";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./utils/formValuetype";


const App = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      tech_stack: [{ stack: "" }],
      dob: "",
      gender: "",
    },
  });
  return (
    <Box
      w={"100%"}
      h={"100%"}
      p={10}
      display={"flex"}
      flexDir={"column"}
      gap={"40px"}
    >
      <Text fontSize={"24px"} fontWeight={700} align={"center"}>
        User Details
      </Text>
      <FormProvider {...form}>
        <Form />
      <DisplayData />
      </FormProvider>
    </Box>
  );
};

export default App;
