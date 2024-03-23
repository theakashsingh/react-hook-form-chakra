import { Box, Text } from "@chakra-ui/react";

const DisplayData = () => {
  
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
        <Text>Akash</Text>
      </Box>

      {/* last name */}
      <Box display={"flex"} gap={"10px"}>
        {" "}
        <Text fontSize={"18px"} fontWeight={"700"}>
          Last Name:
        </Text>{" "}
        <Text>Akash</Text>
      </Box>

      {/* email id */}
      <Box display={"flex"} gap={"10px"}>
        {" "}
        <Text fontSize={"18px"} fontWeight={"700"}>
          Email Id:
        </Text>{" "}
        <Text>Akash</Text>
      </Box>

      {/* gender */}
      <Box display={"flex"} gap={"10px"}>
        {" "}
        <Text fontSize={"18px"} fontWeight={"700"}>
          Gender:
        </Text>{" "}
        <Text>Akash</Text>
      </Box>

      {/* date of birth */}
      <Box display={"flex"} gap={"10px"}>
        {" "}
        <Text fontSize={"18px"} fontWeight={"700"}>
          Date of Birth:
        </Text>{" "}
        <Text>Akash</Text>
      </Box>

      {/* tech stack */}
      <Box display={"flex"} gap={"10px"}>
        {" "}
        <Text fontSize={"18px"} fontWeight={"700"}>
          Tech Stack:
        </Text>{" "}
        <Text>Akash</Text>
      </Box>
    </Box>
    
  );
};

export default DisplayData;
