/* eslint-disable @typescript-eslint/no-explicit-any */
import { Paper } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import styles from "./styles.module.css";
import AddTask from "./AddTask/AddTask";
import FilterTask from "./FilterTask/FilterTask";
import { useState } from "react";
import { TSearchQuery } from "@/types";

const TopSection = ({ setQuery }: TSearchQuery) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <div className={styles.topSection}>
      <AddTask />
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "55%",
          height: "35px",
          "@media (max-width:600px)": {
            height: "30px",
            width: "60%",
          },
        }}
      >
        <InputBase
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setQuery((prev: Record<string, any>) => ({
                ...prev,
                searchTerm: searchTerm,
              }));
            }
          }}
          sx={{
            ml: 1,
            flex: 3,
            padding: "5px 10px",
            fontSize: "14px",
            fontWeight: 400,
            width: "100%",
            "@media (max-width:600px)": {
              ml: 0,
              fontSize: "10px",
              padding: "1px 8px",
            },
          }}
          placeholder="Search Task"
        />
        <IconButton
          onClick={() => {
            setQuery((prev: Record<string, any>) => ({
              ...prev,
              searchTerm: searchTerm,
            }));
          }}
          type="button"
          sx={{
            p: "10px",
            "@media (max-width:600px)": {
              p: "6px",
            },
          }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <FilterTask setQuery={setQuery} />
    </div>
  );
};

export default TopSection;
