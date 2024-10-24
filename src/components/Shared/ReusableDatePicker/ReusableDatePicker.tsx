import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

type TReusableDatePicker = {
  value: Dayjs | null;
  handleOnChange: (value: Dayjs | null) => void;
};

const ReusableDatePicker = ({ value, handleOnChange }: TReusableDatePicker) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <DatePicker
          label="Due Date *"
          value={value}
          onChange={handleOnChange}
          sx={{ width: "100%" }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default ReusableDatePicker;
