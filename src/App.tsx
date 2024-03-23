import { Box } from "@chakra-ui/react";
import Form from "./component/Form";
import DisplayData from "./component/DisplayData";


 
const App = () => {
  
  return (
    <Box  w={"100%"} h={"100%"} p={10}>
      <Form/>
      <DisplayData/>
    </Box>
  )
}

export default App
