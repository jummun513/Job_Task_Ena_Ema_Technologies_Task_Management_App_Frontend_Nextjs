"use client";
import styles from "./styles.module.css";

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 52 },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const Tasks = () => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th></th>
            <th scope="col" className={styles.taskTableTh}>
              Product name
            </th>
            <th scope="col" className={styles.taskTableTh}>
              Color
            </th>
            <th scope="col" className={styles.taskTableTh}>
              Category
            </th>
            <th scope="col" className={styles.taskTableTh}>
              Price
            </th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {rows.map((data, id) => {
            return (
              <tr key={id} className={styles.taskTableTr}>
                <td className={styles.taskTableTd}>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    name=""
                    id=""
                  />
                </td>
                <th scope="row" className={styles.taskTableTh}>
                  {data.firstName}
                </th>
                <td className={styles.taskTableTd}>{data.lastName}</td>
                <td className={styles.taskTableTd}>{data.age}</td>
                <td className={styles.taskTableTd}>$2999</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
