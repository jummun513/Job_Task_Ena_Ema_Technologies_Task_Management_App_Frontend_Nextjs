/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllCategoriesQuery } from "@/redux/categories/categoriesApi";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type TSelectChip = {
  tags: string[];
  handleTagsChange: (event: SelectChangeEvent<string[]>) => void;
};

const SelectChip = ({ tags, handleTagsChange }: TSelectChip) => {
  const { data, isLoading } = useGetAllCategoriesQuery("");

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={tags}
          onChange={handleTagsChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {isLoading ? (
            <p>Loading...</p>
          ) : data?.data?.length < 1 ? (
            <p>Nothing</p>
          ) : (
            data?.data?.map((d: any, i: number) => (
              <MenuItem key={i} value={d.title}>
                {d.title}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectChip;
