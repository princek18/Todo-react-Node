import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import "./ModalComponent.css";
import { TextField } from "@mui/material";
import moment from "moment";
import { requestAPI } from "../../../utlis/utils";

export const ModalComponent = ({
  todo,
  isModalOpen,
  setIsModalOpen,
  setFlag,
  flag,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleOk = () => {
    todo.title = title;
    todo.description = description;
    let time = moment(new Date()).format("DD-MM-YYYY HH:mm:ss");
    todo.time = time;
    document.getElementById("loader").style.display = "block";
    requestAPI('PUT', '/edit', todo, null)
      .then((response) => {
        document.getElementById("loader").style.display = "none";
        console.log(response.data);
        setIsModalOpen(false);
        setFlag(!flag);
      })
      .catch((err) => {
        document.getElementById("loader").style.display = "none";
        console.log(err.response.data);
        alert(err.response.data);
        setIsModalOpen(true);
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setTitle(todo.title);
    setDescription(todo.description);
  }, [todo]);

  return (
    <>
      <Modal
        title="Edit"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <TextField
          className="inpt"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "50%" }}
          label="Title"
          color="secondary"
          focused
        />
        <TextField
          className="inpt"
          label="Description"
          type="text"
          value={description}
          style={{ width: "100%" }}
          onChange={(e) => setDescription(e.target.value)}
          focused
        />
      </Modal>
    </>
  );
};
