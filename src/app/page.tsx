import { Container } from "@mui/material";
import styles from "./styles.module.css";
import Tasks from "@/components/UI/HomePage/Tasks/Tasks";
import TopSection from "@/components/UI/HomePage/TopSection/TopSection";

export default function HomePage() {
  return (
    <Container>
      <div className={styles.page}>
        <h1 className={styles.heading}>Task Management App</h1>
        <TopSection />
        <Tasks />
      </div>
    </Container>
  );
}
