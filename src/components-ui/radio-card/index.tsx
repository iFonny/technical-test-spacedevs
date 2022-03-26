import { Button, useRadio, UseRadioProps } from '@chakra-ui/react';
import { ReactElement } from 'react';

interface RadioCardProps extends UseRadioProps {
  label: string;
  icon?: ReactElement;
}

export const RadioCard = (props: RadioCardProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Button
      size="md"
      leftIcon={props.icon}
      as="label"
      cursor="pointer"
      {...checkbox}
      _checked={{
        bg: 'teal.600',
        color: 'white',
        borderColor: 'teal.600',
      }}
    >
      {props.label}
      <input {...input} />
    </Button>
  );
};
