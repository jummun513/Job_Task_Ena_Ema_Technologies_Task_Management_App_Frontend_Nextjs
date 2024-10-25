"use client";
import { Button, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ReusableModal from "@/components/Shared/ReusableModal/ReusableModal";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TagChip from "./TagChip/TagChip";
import { useAddTaskMutation } from "@/redux/task/taskApi";
import { toast } from "react-toastify";

const AddTask = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Dayjs | null>(dayjs(Date.now()));
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
  const [addData, { isSuccess, isLoading, isError, error }] =
    useAddTaskMutation();
  const notifySuccess = () => toast.success("Successfully added task!");
  const notifyError = () => toast.error("Something wrong!");
  const [controlledError, setControlledError] = useState("");

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value);
    setData((prevData) => ({
      ...prevData,
      priority: event.target.value,
    }));
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    setControlledError("");
    setDate(newDate);
    setData((prevData) => ({
      ...prevData,
      dueDate: newDate?.toISOString(),
    }));
  };

  const handleTagChange = (newTags: string[]) => {
    setControlledError("");
    setTags(newTags);
    setData((prevData) => ({
      ...prevData,
      tags: newTags.map((tag) => ({ title: tag, isDeleted: false })),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (data?.name.length < 1) {
      return setControlledError("nameError");
    } else if (Date.now() > Date.parse(`${data?.dueDate}`)) {
      return setControlledError("dateError");
    } else if (data?.tags.length < 2) {
      return setControlledError("tagError");
    } else if (data?.description.length < 1) {
      return setControlledError("descriptionError");
    }

    try {
      await addData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      notifySuccess();
      formRef?.current?.reset();
      setModalOpen(false);
    } else if (isError) {
      console.error(error);
      notifyError();
    }
  }, [isSuccess, isError, error]);

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
        isLoading={isLoading}
        title="Add a Task"
        sx={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
        buttonText="Add Task"
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
            <p style={{ fontSize: "12px", marginTop: "5px", color: "red" }}>
              {controlledError == "nameError" && "Name is required!"}
            </p>
          </div>
          <div className={styles.inputContainer}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  minDate={dayjs(Date.now())}
                  format="DD/MM/YYYY"
                  label="Due Date *"
                  value={date}
                  onChange={handleDateChange}
                  sx={{ width: "100%" }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <p style={{ fontSize: "12px", marginTop: "5px", color: "red" }}>
              {controlledError == "dateError" && "Date must be future date!"}
            </p>
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
            <p style={{ fontSize: "12px", marginTop: "5px", color: "red" }}>
              {controlledError == "tagError" && "At least a tag must be added!"}
            </p>
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
            <p style={{ fontSize: "12px", marginTop: "5px", color: "red" }}>
              {controlledError == "descriptionError" &&
                "Description is required!"}
            </p>
          </div>
        </form>
      </ReusableModal>
    </div>
  );
};

export default AddTask;
