import { InputGroup, InputRightElement, InputLeftElement } from '@chakra-ui/react';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { CalendarIcon, CloseIcon } from '@chakra-ui/icons';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { setBirthdate } from '@redux/slices/filters';
import { useRouter } from 'next/router';
import routes from 'src/constants/routes';

export const InputDate = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const birthdate = useAppSelector((state) => state.filters.birthdate);

  const handleChangeBirthdate = (date?: Date) => {
    if (router.pathname === routes.home) router.push(routes.launches.list);
    dispatch(setBirthdate(date));
  };

  return (
    <InputGroup width="fit-content" size="lg">
      <InputLeftElement pointerEvents="none" children={<CalendarIcon />} />
      <SingleDatepicker
        name="date-input"
        date={birthdate}
        onDateChange={handleChangeBirthdate}
        propsConfigs={{
          inputProps: {
            width: 380,
            paddingStart: 12,
            placeholder: 'Enter your birth date',
            isReadOnly: true,
            size: 'lg',
          },
        }}
      />
      <InputRightElement mr={2} width="auto">
        {birthdate && <CloseIcon role="button" h={3} onClick={() => handleChangeBirthdate()} color="red.300" mr={2} />}
      </InputRightElement>
    </InputGroup>
  );
};
