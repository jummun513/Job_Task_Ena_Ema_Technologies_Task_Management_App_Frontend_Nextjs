/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetAllTasksQuery } from "@/redux/task/taskApi";
import styles from "./styles.module.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

const TasksSection = ({ query }: Record<string, any>) => {
  const { data, isLoading } = useGetAllTasksQuery({ ...query });

  console.log(query);

  return (
    <div className={styles.tableContainer}>
      {isLoading ? (
        <div className={styles.loading}>Loading...</div>
      ) : data.data.length < 1 ? (
        <div className={styles.loading}>Nothing match!</div>
      ) : (
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th></th>
              <th scope="col" className={styles.taskTableTh}>
                Task name
              </th>
              <th scope="col" className={styles.taskTableTh}>
                Priority
              </th>
              <th scope="col" className={styles.taskTableTh}>
                Description
              </th>
              <th scope="col" className={styles.taskTableTh}>
                Status
              </th>
              <th scope="col" className={styles.taskTableTh}>
                Tags
              </th>
              <th scope="col" className={styles.taskTableTh}>
                Action
              </th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {data?.data?.map((data: any, id: number) => {
              return (
                <tr key={id} className={styles.taskTableTr}>
                  <td className={styles.taskTableTd}>
                    <input
                      className={styles.checkbox}
                      checked={data.status === "completed"}
                      type="checkbox"
                      name=""
                      id=""
                    />
                  </td>
                  <th scope="row" className={styles.taskTableTh}>
                    {data.name}
                  </th>
                  <td
                    className={styles.taskTableTd}
                    style={
                      data.priority === "low"
                        ? { color: "green", fontWeight: 500 }
                        : data.priority === "medium"
                        ? { color: "#FFBF00", fontWeight: 500 }
                        : { color: "red", fontWeight: 500 }
                    }
                  >
                    {data.priority}
                  </td>
                  <td className={styles.taskTableTd}>
                    {data.description.slice(0, 30) + "..."}
                  </td>
                  <td className={styles.taskTableTd}>{data.status}</td>
                  <td className={styles.taskTableTd}>
                    {data.tags.map((d: any, i: number) => {
                      return <span key={i}>{d.title + ", "}</span>;
                    })}
                  </td>
                  <td
                    className={styles.taskTableTd}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <IconButton
                      type="button"
                      sx={{
                        color: "rgb(37 99 235)",
                        p: "10px",
                        "@media (max-width:600px)": {
                          p: "4px",
                        },
                      }}
                    >
                      <EditNoteIcon
                        sx={{
                          height: "30px",
                          width: "30px",
                          "@media (max-width:600px)": {
                            height: "20px",
                            width: "20px",
                          },
                        }}
                      />
                    </IconButton>
                    <IconButton
                      type="button"
                      sx={{
                        color: "red",
                        p: "10px",
                        "@media (max-width:600px)": {
                          p: "4px",
                        },
                      }}
                    >
                      <DeleteIcon
                        sx={{
                          height: "30px",
                          width: "30px",
                          "@media (max-width:600px)": {
                            height: "18px",
                            width: "18px",
                          },
                        }}
                      />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TasksSection;
