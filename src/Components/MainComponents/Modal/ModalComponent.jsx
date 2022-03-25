import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import "./ModalComponent.css";
import { TextField } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../MainComponent";
import moment from "moment";

export const ModalComponent = ({
  todo,
  isModalOpen,
  setIsModalOpen,
  setFlag,
  flag
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleOk = () => {
    todo.title = title;
    todo.description = description;
    let time = moment(new Date()).format("DD-MM-YYYY HH:mm:ss");
    todo.time = time;
    document.getElementById('loader').style.display = "block";
    axios.put(`${baseUrl}/edit`, todo)
    .then((response) => {
      console.log(response.data);
      setIsModalOpen(false);
      setFlag(!flag);
    })
    .catch((err) => {
      alert(err.response.data.message.msg);
      setIsModalOpen(true)
    });
    document.getElementById('loader').style.display = "none";
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() =>{
    setTitle(todo.title);
    setDescription(todo.description);
  }, [todo]);

  return (
    <>
      <Modal
        title="Basic Modal"
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
          style={{width: "100%"}}
          onChange={(e) => setDescription(e.target.value)}
          focused
        />
      </Modal>
    </>
  );
};
