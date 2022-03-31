import React, { useState } from "react";
import "./InputComponent.css";
import { Button } from "@mui/material";
import moment from "moment";
import { requestAPI } from "../../../utlis/utils";

export const InputComponent = ({ flag, setFlag }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    let time = new Date();
    time = moment(time).format("DD-MM-YYYY HH:mm:ss");
    document.getElementById("loader").style.display = "block";
    requestAPI('POST', '/addtodo', { title, description, time }, null)
      .then((response) => {
        document.getElementById("loader").style.display = "none";
        console.log(response.data);
        setFlag(!flag);
        setTitle("");
        setDescription("");
      })
      .catch((err) => {
        document.getElementById("loader").style.display = "none";
        alert(err.response.data);
      });
  };
  return (
    <form className="form" onSubmit={addTodo}>
      <label htmlFor="title">Title: </label>
      <input
        placeholder="Title..."
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="description">Description: </label>
      <input
        placeholder="Description..."
        id="description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button type="submit" className="btn" variant="contained">
        Add
      </Button>
    </form>
  );
};
