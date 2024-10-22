"use client";
import { Button, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ReusableModal from "@/components/Shared/ReusableModal/ReusableModal";
import { useRef, useState } from "react";
import styles from "./styles.module.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TagChip from "./TagChip/TagChip";

const AddTask = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [value, setValue] = useState<Dayjs | null>(dayjs("2022-04-17"));
  const formRef = useRef<null>(null);
  const [age, setAge] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const handleInputChange = (field, e) => {
    // let value;
    // if (field === 'offerEnd') {
    //     value = e;
    // }
    // else if (field === 'photo') {
    //     value = e.target.files[0];
    // }
    // else {
    //     value = e.target.value;
    // }
    // if (field === 'photo') {
    //     setData((prevData) => ({
    //         ...prevData,
    //         [field]: [value],
    //     }))
    // }
    // else {
    //     setData((prevData) => ({
    //         ...prevData,
    //         [field]: value,
    //     }))
    // }
  };

  const handleSubmit = () => {
    console.log("hello");
  };
  return (
    <div>
      <Button
        onClick={() => setModalOpen(true)}
        sx={{
          "@media (max-width:600px)": {
            display: "none",
          },
        }}
        startIcon={<AddCircleIcon />}
      >
        Add New Task
      </Button>
      <IconButton
        onClick={() => setModalOpen(true)}
        type="button"
        sx={{
          p: "10px",
          color: "primary.main",
          "@media (min-width:600px)": {
            display: "none",
          },
        }}
      >
        <AddCircleIcon />
      </IconButton>
      <ReusableModal
        setOpen={setModalOpen}
        open={modalOpen}
        title="Add a Task"
        sx={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
      >
        <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label className={styles.inputLabel}>
              Task Title<sup className={styles.inputRequired}>*</sup>
            </label>
            <input
              onChange={(e) => handleInputChange("target", e)}
              type="text"
              className={styles.textInput}
              placeholder="Examination Preparation"
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Due Date"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                  sx={{ width: "100%" }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className={styles.inputContainer}>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
              fullWidth={true}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>
              Tags<sup className={styles.inputRequired}>*</sup>
            </label>
            <TagChip />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>
              Description<sup className={styles.inputRequired}>*</sup>
            </label>
            <textarea
              onChange={(e) => handleInputChange("desc", e)}
              style={{ resize: "none" }}
              className={styles.inputTextArea}
              placeholder="Write Here..."
              required
            ></textarea>
          </div>
        </form>
      </ReusableModal>
    </div>
  );
};

export default AddTask;
