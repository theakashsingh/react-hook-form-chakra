import React, { forwardRef, ForwardRefRenderFunction, useRef } from 'react';
import { Select, Box, Icon } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useSelect } from 'chakra-react-select';

interface CustomDropdownProps {
  options: { value: string; label: string }[];
  dropdownRef: React.RefObject<any>; // Define a dropdownRef prop
}

const CustomDropdown: ForwardRefRenderFunction<any, CustomDropdownProps> = (
  { options, dropdownRef, ...rest },
  ref
) => {
  const selectRef = useRef<any>(null); // Create a ref for the Select component

  const {
    getSelectProps,
    getInputProps,
    getMenuProps,
    isOpen,
    selectedItem,
    highlightedIndex,
  } = useSelect({ ref: selectRef, ...rest });

  // Expose focus method through dropdownRef
  React.useImperativeHandle(dropdownRef, () => ({
    focus: () => {
      selectRef.current.focus();
    },
  }));

  return (
    <Select {...getSelectProps()} ref={selectRef}>
      <Box position="relative">
        <input {...getInputProps()} />
        {isOpen && (
          <Box position="absolute" width="100%" zIndex="1" {...getMenuProps()}>
            {options.map((option, index) => (
              <Box
                key={option.value}
                px={2}
                py={1}
                bg={highlightedIndex === index ? 'gray.100' : 'transparent'}
                cursor="pointer"
                _hover={{ bg: 'gray.100' }}
                onClick={() => selectRef.current.selectOption(option)}
              >
                {option.label}
                {selectedItem === option && (
                  <Icon as={CheckIcon} color="green.500" ml="auto" />
                )}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Select>
  );
};

export default forwardRef(CustomDropdown);
