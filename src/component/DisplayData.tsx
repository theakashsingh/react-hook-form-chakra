import { Box, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { FormValues } from "../utils/formValuetype";

const DisplayData = () => {
  const { getValues } = useFormContext<FormValues>();
  const formData = getValues();
  console.log({ formData });

  const formattedDateOfBirth = formData.dob
    ? new Date(formData.dob).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).replace(/ /g, '/')
    : "";


  return (
    <Box
      w={"100%"}
      h={"max-content"}
      bg={"#F0EBEB"}
      p={"40px 40px"}
      rounded={"lg"}
    >
      {/* first name */}
      <Box display={"flex"} gap={"10px"}>
        {" "}
        <Text fontSize={"18px"} fontWeight={"700"}>
          First Name:
        </Text>{" "}
        <Text>{formData.first_name}</Text>
      </Box>

      {/* last name */}
      <Box display={"flex"} gap={"10px"}>
        {" "}
        <Text fontSize={"18px"} fontWeight={"700"}>
          Last Name:
        </Text>{" "}
        <Text>{formData.last_name}</Text>
      </Box>

      {/* email id */}
      <Box display={"flex"} gap={"10px"}>
        {" "}
        <Text fontSize={"18px"} fontWeight={"700"}>
          Email Id:
        </Text>{" "}
        <Text>{formData.email}</Text>
      </Box>

      {/* gender */}
      <Box display={"flex"} gap={"10px"}>
        {" "}
        <Text fontSize={"18px"} fontWeight={"700"}>
          Gender:
        </Text>{" "}
        <Text>{formData.gender}</Text>
      </Box>

      {/* date of birth */}
      <Box display={"flex"} gap={"10px"}>
        {" "}
        <Text fontSize={"18px"} fontWeight={"700"}>
          Date of Birth:
        </Text>{" "}
        <Text>{formattedDateOfBirth}</Text>
      </Box>

      {/* tech stack */}
      <Box display={"flex"} gap={"10px"}>
        {" "}
        <Text fontSize={"18px"} fontWeight={"700"}>
          Tech Stack:
        </Text>{" "}
        {formData.tech_stack.map((tech,index) => (
          <Text key={`${index}_${tech.stack}`}>{tech.stack}</Text>
        ))}
      </Box>
    </Box>
  );
};

export default DisplayData;
