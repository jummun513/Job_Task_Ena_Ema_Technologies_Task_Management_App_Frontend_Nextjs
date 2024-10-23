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
import MenuItem from "@mui/material/MenuItem";
import TagChip from "./TagChip/TagChip";

const AddTask = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Dayjs | null>(dayjs("2022-04-17"));
  const formRef = useRef<HTMLFormElement | null>(null);
  const [priority, setPriority] = useState<string>("medium");
  const [tags, setTags] = useState<string[]>(["Default"]);
  const [data, setData] = useState({
    name: "",
    priority: priority,
    dueDate: date?.toISOString(),
    description: "",
    tags: tags.map((tag) => ({ title: tag, isDeleted: false })),
  });

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value);
    setData((prevData) => ({
      ...prevData,
      priority: event.target.value,
    }));
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    setDate(newDate);
    setData((prevData) => ({
      ...prevData,
      dueDate: newDate?.toISOString(),
    }));
  };

  const handleTagChange = (newTags: string[]) => {
    setTags(newTags);
    setData((prevData) => ({
      ...prevData,
      tags: newTags.map((tag) => ({ title: tag, isDeleted: false })),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(data);
      // const response = await fetch("/api/tasks", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // });

      // if (response.ok) {
      //   console.log("Task added successfully");
      //   setModalOpen(false);
      // } else {
      //   console.error("Failed to add task");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
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
        handleSubmit={handleSubmit}
        setOpen={setModalOpen}
        open={modalOpen}
        title="Add a Task"
        sx={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
      >
        <form ref={formRef} className={styles.form}>
          <div>
            <label className={styles.inputLabel}>
              Task Name<sup className={styles.inputRequired}>*</sup>
            </label>
            <input
              type="text"
              className={styles.textInput}
              placeholder="Examination Preparation"
              required
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className={styles.inputContainer}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Due Date *"
                  value={date}
                  onChange={handleDateChange}
                  sx={{ width: "100%" }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className={styles.inputContainer}>
            <label id="demo-simple-select-label" className={styles.inputLabel}>
              Priority<sup className={styles.inputRequired}>*</sup>
            </label>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={priority}
              onChange={handlePriorityChange}
              fullWidth={true}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>
              Tags<sup className={styles.inputRequired}>*</sup>
            </label>
            <TagChip onTagChange={handleTagChange} />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>
              Description<sup className={styles.inputRequired}>*</sup>
            </label>
            <textarea
              style={{ resize: "none" }}
              className={styles.inputTextArea}
              placeholder="Write Here..."
              required
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            ></textarea>
          </div>
        </form>
      </ReusableModal>
    </div>
  );
};

export default AddTask;
