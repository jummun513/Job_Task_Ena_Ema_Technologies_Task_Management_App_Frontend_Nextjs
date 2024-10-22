import { Button, Paper } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import styles from "./styles.module.css";
import AddTask from "./AddTask/AddTask";

const TopSection = () => {
  return (
    <div className={styles.topSection}>
      <AddTask />
      <Paper
        component={"form"}
        elevation={1}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <InputBase
          sx={{
            ml: 1,
            flex: 3,
            padding: "5px 10px",
            fontSize: "14px",
            fontWeight: 400,
            width: "100%",
            "@media (max-width:600px)": {
              ml: 0,
              width: "40%",
              fontSize: "10px",
              padding: "1px 8px",
            },
          }}
          placeholder="Search Task"
          inputProps={{ "aria-label": "search" }}
        />
        <IconButton
          type="button"
          sx={{
            p: "10px",
            "@media (max-width:600px)": {
              p: "6px",
            },
          }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <Button
        sx={{
          "@media (max-width:600px)": {
            display: "none",
          },
        }}
        startIcon={<FilterListIcon />}
      >
        Filter
      </Button>
      <IconButton
        type="button"
        sx={{
          p: "10px",
          color: "primary.main",
          "@media (min-width:600px)": {
            display: "none",
          },
        }}
      >
        <FilterListIcon />
      </IconButton>
    </div>
  );
};

export default TopSection;