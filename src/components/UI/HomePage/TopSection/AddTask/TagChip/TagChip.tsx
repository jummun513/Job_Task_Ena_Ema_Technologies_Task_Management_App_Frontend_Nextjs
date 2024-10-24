/* eslint-disable @typescript-eslint/no-explicit-any */
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import styles from "./styles.module.css";
import { useState } from "react";

interface ChipData {
  key: number;
  label: string;
}

const data = [{ key: 0, label: "Default" }];

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const TagChip = ({ onTagChange }: any) => {
  const [chipData, setChipData] = useState<ChipData[]>(data);
  const [inputValue, setInputValue] = useState<string>("");

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.keyCode === 32) && inputValue.trim() !== "") {
      const updatedChips = [
        ...chipData,
        { key: chipData.length + 1, label: inputValue.trim() },
      ];
      setChipData(updatedChips);
      setInputValue("");
      onTagChange(updatedChips.map((chip) => chip.label));
    }
  };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {chipData.map((d) => {
        let icon;
        if (d.label === "Default") {
          icon = <TagFacesIcon />;
        }

        return (
          <ListItem key={d.key}>
            <Chip
              icon={icon}
              label={d.label}
              onDelete={d.label === "Default" ? undefined : handleDelete(d)}
            />
          </ListItem>
        );
      })}
      <input
        type="text"
        className={styles.textInput}
        placeholder="Type then press enter or space"
        required
        value={inputValue}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
      />
    </Paper>
  );
};

export default TagChip;
