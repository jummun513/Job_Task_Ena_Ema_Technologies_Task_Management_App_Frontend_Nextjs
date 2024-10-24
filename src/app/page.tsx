"use client";
import { Container } from "@mui/material";
import styles from "./styles.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopSection from "@/components/UI/HomePage/TopSection/TopSection";
import TasksSection from "@/components/UI/HomePage/TasksSection/TasksSection";
import { useState } from "react";

export default function HomePage() {
  const [query, setQuery] = useState({});

  return (
    <Container>
      <div className={styles.page}>
        <h1 className={styles.heading}>Task Management App</h1>
        <TopSection setQuery={setQuery} />
        <TasksSection query={query} />
      </div>
      <ToastContainer />
    </Container>
  );
}
