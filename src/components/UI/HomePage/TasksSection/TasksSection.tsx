/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  useDeleteTaskMutation,
  useGetAllTasksQuery,
  useUpdateTaskMutation,
} from "@/redux/task/taskApi";
import styles from "./styles.module.css";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";

const TasksSection = ({ query }: Record<string, any>) => {
  const { data, isLoading } = useGetAllTasksQuery({ ...query });
  const [deleteTask, { isSuccess }] = useDeleteTaskMutation();
  const [updateIsCompleted, { isSuccess: isCompletedSuccess }] =
    useUpdateTaskMutation();

  const showToast = (id: string) => {
    const ToastWithCountdown = () => {
      const [seconds, setSeconds] = useState(5);

      useEffect(() => {
        async function handleUndo() {
          if (seconds < 1) {
            await deleteTask(id).unwrap();
          }
          if (seconds > 0) {
            const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
            return () => clearTimeout(timer);
          }
        }
        handleUndo();
      }, [seconds]);

      return (
        <div>
          Deleting task{" "}
          <strong
            style={{
              border: "1px solid lightGray",
              padding: "5px",
              borderRadius: "50%",
            }}
          >
            {seconds}s
          </strong>
          <button
            onClick={() => {
              toast.dismiss();
            }}
            style={{
              marginLeft: "20px",
              background: "none",
              border: "none",
              color: "#007bff",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Undo
          </button>
        </div>
      );
    };

    toast.warning(<ToastWithCountdown />, {
      autoClose: 5000,
      closeOnClick: false,
      pauseOnHover: false,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Task deleted successfully!");
    }
    if (isCompletedSuccess) {
      toast.success("Task updated successfully!");
    }
  }, [isSuccess, isCompletedSuccess]);

  const toggleComplete = async (id: string, body: any) => {
    updateIsCompleted({ id: id, body });
  };

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
                <tr
                  key={id}
                  className={styles.taskTableTr}
                  style={
                    data?.status === "completed"
                      ? { backgroundColor: "#f2f2f2" }
                      : {}
                  }
                >
                  <td className={styles.taskTableTd}>
                    <input
                      className={styles.checkbox}
                      onChange={() =>
                        toggleComplete(data._id, {
                          status:
                            data?.status === "completed"
                              ? "pending"
                              : "completed",
                        })
                      }
                      type="checkbox"
                      defaultChecked={
                        data?.status === "completed" ? true : false
                      }
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
                    {data.description.slice(0, 50) + "..."}
                  </td>
                  <td
                    className={styles.taskTableTd}
                    style={
                      data?.status === "pending"
                        ? { color: "blue" }
                        : { color: "green" }
                    }
                  >
                    {data.status}
                  </td>
                  <td className={styles.taskTableTd}>
                    {data.tags.map((d: any, i: number) => {
                      return <span key={i}>{d.title + ", "}</span>;
                    })}
                  </td>
                  <td
                    className={styles.taskTableTd}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div>
                      {data?.isReminder ? (
                        <Tooltip title={"Tap to off."}>
                          <IconButton
                            type="button"
                            sx={{
                              color: "primary.main",
                              p: "10px",
                              "@media (max-width:600px)": {
                                p: "4px",
                              },
                            }}
                          >
                            <NotificationsOffIcon
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
                        </Tooltip>
                      ) : (
                        <Tooltip title={"Tap to on"}>
                          <IconButton
                            type="button"
                            sx={{
                              color: "primary.main",
                              p: "10px",
                              "@media (max-width:600px)": {
                                p: "4px",
                              },
                            }}
                          >
                            <NotificationsActiveIcon
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
                        </Tooltip>
                      )}
                    </div>
                    <Tooltip title={"Edit"}>
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
                    </Tooltip>
                    <Tooltip title={"Delete"}>
                      <IconButton
                        onClick={() => showToast(data?._id)}
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
                    </Tooltip>
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
