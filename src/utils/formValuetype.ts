export type FormValues = {
    first_name: string;
    last_name: string;
    email: string;
    tech_stack: {
      stack: string;
    }[];
    dob: Date|string;
    gender: "";
  };

export type optionType = {
    value:string,
    label:string,
    icon:JSX.Element;
}