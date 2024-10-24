import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type TData = {
  label: string;
  value: string;
};

type TReusableSelect = {
  data: TData[];
  handleOnChange: (event: SelectChangeEvent) => void;
  value: string;
  labelId?: string;
};

const ReusableSelect = ({
  data,
  handleOnChange,
  value,
  labelId,
}: TReusableSelect) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>{labelId}</InputLabel>
      <Select
        labelId={labelId}
        value={value}
        onChange={handleOnChange}
        label={labelId}
      >
        {data.map((d, k) => {
          return (
            <MenuItem key={k} value={d.value}>
              {d.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default ReusableSelect;
