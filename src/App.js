import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { BsFillArchiveFill, BsCheckCircleFill } from "react-icons/bs";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useRef } from "react";

function App() {
  const getStoredCompletedTasks = JSON.parse(
    localStorage.getItem("completedTasks")
  );
  const getStoredIncompletedTasks = JSON.parse(
    localStorage.getItem("incompletedTasks")
  );

  const [completedTasks, setCompletedTasks] = useState(
    getStoredCompletedTasks || []
  );
  const [incompletedTasks, setIncompletedTasks] = useState(
    getStoredIncompletedTasks || []
  );
  const currentTask = useRef(null);
  const [error, setError] = useState(false);
  const deleteCompletedTask = (Task) => {
    const newTasks = completedTasks.filter((task) => Task !== task);
    setCompletedTasks(newTasks);
    localStorage.setItem("completedTasks", JSON.stringify(newTasks));
  };

  const deleteIncompletedTask = (Task) => {
    const newTasks = incompletedTasks.filter((task) => Task !== task);
    setIncompletedTasks(newTasks);
    localStorage.setItem("incompletedTasks", JSON.stringify(newTasks));
  };

  const markCompleted = (task) => {
    const newArr = [task, ...completedTasks];
    deleteIncompletedTask(task);
    setCompletedTasks(newArr);
    localStorage.setItem("completedTasks", JSON.stringify(newArr));
  };

  const addTask = () => {
    const currTask = currentTask.current.value;
    if (incompletedTasks.indexOf(currTask) === -1 && currTask.length) {
      const newArr = [currTask, ...incompletedTasks];
      setIncompletedTasks(newArr);
      currentTask.current.value = "";
      localStorage.setItem("incompletedTasks", JSON.stringify(newArr));
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };
  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const update = debounce(function (e) {
    console.log(e.target.value);
    const searchingKey = e.target.value.toLowerCase();
    const newIncompletedTasks = getStoredIncompletedTasks.filter((task) =>
      task.toLowerCase().includes(searchingKey)
    );

    setIncompletedTasks(newIncompletedTasks);
  }, 300);

  const [sInput, setSInput] = useState("");
  function SearchTodo() {
    return (
      <>
        <div className="searchbar">
          <input
            type="text"
            value={sInput}
            onChange={(e) => {
              setSInput(e.target.value);
              update(e);
            }}
            placeholder="Search tasks"
            autoFocus
          />
          <SearchIcon className="search-icon" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container0">
        {error && (
          <>
            <div className="error">Task already Exists</div>
          </>
        )}
        <input
          type="text"
          className="task-input"
          ref={currentTask}
          placeholder="Enter task"
        />
        <BsFillArrowDownCircleFill
          size={42}
          className="save-icon"
          onClick={() => {
            addTask();
          }}
        />
      </div>
      {getStoredIncompletedTasks.length ? <SearchTodo /> : null}

      <main className="app">
        <IncompleteTask
          className="container2"
          incompletedTasks={incompletedTasks}
          deleteIncompletedTask={deleteIncompletedTask}
          markCompleted={markCompleted}
        />
        <CompletedTask
          className="container1"
          completedTasks={completedTasks}
          deleteCompletedTask={deleteCompletedTask}
        />
      </main>
    </>
  );
}

function CompletedTask({ completedTasks, deleteCompletedTask }) {
  return (
    <>
      <section className="comp-task">
        <h2>Completed Tasks</h2>
        <hr />
        {completedTasks.map((item) => {
          return (
            <view style={{ display: "flex", flexDirection: "row" }} key={item}>
              <h3>{item}</h3>
              <BsFillArchiveFill
                className="del-icon"
                size={35}
                onClick={() => {
                  deleteCompletedTask(item);
                }}
              />
            </view>
          );
        })}
      </section>
    </>
  );
}

function IncompleteTask({
  incompletedTasks,
  deleteIncompletedTask,
  markCompleted,
}) {
  return (
    <>
      <section className="incomp-task">
        <h2>Tasks To Do</h2>
        <hr />
        {incompletedTasks.map((task) => {
          return (
            <>
              <view
                key={task}
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <h3>{task}</h3>
                <BsCheckCircleFill
                  className="comp-icon"
                  size={35}
                  onClick={() => {
                    markCompleted(task);
                  }}
                />
                <BsFillArchiveFill
                  className="del-icon"
                  size={35}
                  onClick={() => {
                    deleteIncompletedTask(task);
                  }}
                />
              </view>
            </>
          );
        })}
      </section>
    </>
  );
}

export default App;
