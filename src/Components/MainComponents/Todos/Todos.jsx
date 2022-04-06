import React, { useEffect, useState } from "react";
import "./Todos.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { ModalComponent } from "../Modal/ModalComponent";
import { logout, requestAPI } from "../../../utlis/utils";

export const Todos = ({ flag, setFlag }) => {
  const [todos, setTodos] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);

  const CardData = ({ box, todo }) => {
    const addTo_Done = () => {
      document.getElementById("loader").style.display = "block";
      requestAPI('POST', '/addtodone', todo, null)
        .then((response) => {
          document.getElementById("loader").style.display = "none";
          console.log(response.data);
          setFlag(!flag);
        })
        .catch((err) => {
          document.getElementById("loader").style.display = "none";
          alert(err.response.data.message.msg);
        });
    };

    const addTo_Todo = () => {
      document.getElementById("loader").style.display = "block";
      requestAPI('POST', '/addtotodo', todo, null)
        .then((response) => {
          document.getElementById("loader").style.display = "none";
          console.log(response.data);
          setFlag(!flag);
        })
        .catch((err) => {
          document.getElementById("loader").style.display = "none";
          alert(err.response.data.message.msg);
        });
    };

    const handleModal = () => {
      setIsModalOpen(true);
      setModalData(todo);
    };

    const deleteTodo = () => {
      document.getElementById("loader").style.display = "block";
      requestAPI('POST', '/tododelete', todo, null)
        .then((response) => {
          document.getElementById("loader").style.display = "none";
          console.log(response.data);
          setFlag(!flag);
        })
        .catch((err) => {
          document.getElementById("loader").style.display = "none";
          alert(err.response.data.message.msg);
        });
    };

    return (
      <React.Fragment>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {todo.time}
          </Typography>
          <Typography variant="h5" component="div">
            {todo.title}
          </Typography>
          <Typography variant="body2">{todo.description}</Typography>
        </CardContent>
        {box === true ? (
          <CardActions>
            <Button
              onClick={addTo_Todo}
              style={{ marginLeft: "auto" }}
              variant="outlined"
            >
              Re Add
            </Button>
            <Button
              onClick={deleteTodo}
              style={{ marginRight: "auto" }}
              variant="outlined"
            >
              Delete
            </Button>
          </CardActions>
        ) : (
          <CardActions>
            <Button
              onClick={handleModal}
              style={{ marginLeft: "auto" }}
              variant="outlined"
            >
              Edit
            </Button>
            <Button
              onClick={addTo_Done}
              style={{ marginRight: "auto" }}
              variant="outlined"
            >
              Done
            </Button>
          </CardActions>
        )}
      </React.Fragment>
    );
  };

  useEffect(() => {
    document.getElementById("loader").style.display = "block";
    requestAPI('GET', '/todos', null, null)
      .then((response) => {
        document.getElementById("loader").style.display = "none";
        setTodos(response.data);
      })
      .catch((err) => {
        document.getElementById("loader").style.display = "none";
        alert(err.message);
        if (err.message === "Authentication Failed.") {
          logout();
        }
      });

      requestAPI('GET', '/donetodos', null, null)
      .then((response) => {
        document.getElementById("loader").style.display = "none";
        setDoneTodos(response.data);
      })
      .catch((err) => {
        document.getElementById("loader").style.display = "none";
        alert(err.message);
      });
  }, [flag]);

  return (
    <>
      <div className="todos">
        {todos &&
          todos.map((todo) => {
            return (
              <Card
                key={todo.id}
                className="card"
                style={{ borderRight: "5px solid green" }}
                variant="outlined"
              >
                <CardData box={false} todo={todo} />
              </Card>
            );
          })}
      </div>
      {doneTodos.length > 0 && (
        <>
          <h1>Completed Tasks</h1>
          <div className="todos">
            {doneTodos.map((todo) => {
              return (
                <Card
                  key={todo.id}
                  className="card"
                  style={{ borderRight: "5px solid red" }}
                  variant="outlined"
                >
                  <CardData box={true} todo={todo} />
                </Card>
              );
            })}
          </div>
        </>
      )}
      <ModalComponent
        flag={flag}
        todo={modalData}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setFlag={setFlag}
      />
    </>
  );
};
