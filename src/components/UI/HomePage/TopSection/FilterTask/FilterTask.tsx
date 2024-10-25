/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ReusableModal from "@/components/Shared/ReusableModal/ReusableModal";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Button, IconButton, SelectChangeEvent } from "@mui/material";
import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import ReusableSelect from "@/components/Shared/ReusableSelect/ReusableSelect";
import SelectChip from "./SelectChip/SelectChip";
import { TSearchQuery } from "@/types";

const statusList = [
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
];

const priorityList = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

const FilterTask = ({ setQuery }: TSearchQuery) => {
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const isLoading = false;
  const formRef = useRef<HTMLFormElement | null>(null);
  const [priority, setPriority] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [data, setData] = useState({
    priority: priority,
    status: status,
    tags: tags?.join(","),
  });
  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value);
    setData((prevData) => ({
      ...prevData,
      priority: event.target.value,
    }));
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
    setData((prevData) => ({
      ...prevData,
      status: event.target.value,
    }));
  };

  const handleTagsChange = (event: SelectChangeEvent<typeof tags>) => {
    const {
      target: { value },
    } = event;
    setTags(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      tags: tags.join(","),
    }));
  }, [tags]);

  const handleSubmit = async (e: FormEvent<Element>) => {
    e.preventDefault();
    setQuery((prev: Record<string, any>) => ({
      ...prev,
      ...data,
    }));
    setOpenFilterModal(false);
  };

  return (
    <div>
      <Button
        onClick={() => setOpenFilterModal(true)}
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
        onClick={() => setOpenFilterModal(true)}
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
      <ReusableModal
        handleSubmit={handleSubmit}
        setOpen={setOpenFilterModal}
        open={openFilterModal}
        isLoading={isLoading}
        title="Filter Out Tasks"
        buttonText="Filter"
        sx={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
      >
        <form ref={formRef} className={styles.form}>
          <div className={styles.inputContainer}></div>
          <div className={styles.inputContainer}>
            <ReusableSelect
              data={priorityList}
              value={priority}
              handleOnChange={handlePriorityChange}
              labelId="Priority"
            ></ReusableSelect>
          </div>

          <div className={styles.inputContainer}>
            <ReusableSelect
              data={statusList}
              value={status}
              handleOnChange={handleStatusChange}
              labelId="Status"
            ></ReusableSelect>
          </div>

          <div className={styles.inputContainer}>
            <SelectChip tags={tags} handleTagsChange={handleTagsChange} />
          </div>
        </form>
      </ReusableModal>
    </div>
  );
};

export default FilterTask;
