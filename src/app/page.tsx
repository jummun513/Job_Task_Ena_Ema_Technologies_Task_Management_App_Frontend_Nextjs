import { Button } from "@mui/material";
import styles from "./styles.module.css";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <Button>Contained</Button>
      This is new style font.
    </div>
  );
}
