import { forwardRef, useImperativeHandle, useRef } from "react";
import { Select, optionType } from "chakra-react-select";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { optionType } from "../utils/formValuetype";

interface GenderSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: optionType[];
}

const GenderSelect = forwardRef<HTMLSelectElement, GenderSelectProps>(
  ({ value, onChange, options }, ref) => {
    const selectRef = useRef<HTMLSelectElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        selectRef.current?.focus();
      }
    }));

    return (
      <FormControl isInvalid={false}>
        <FormLabel htmlFor="gender">Gender</FormLabel>
        <Select
          ref={selectRef}
          variant="filled"
          selectedOptionColorScheme="#D7D7D7"
          options={options}
          value={options.find(c => c.value === value)}
          onChange={val => onChange(val.value)}
        />
        <FormErrorMessage></FormErrorMessage>
      </FormControl>
    );
  }
);

export default GenderSelect;
