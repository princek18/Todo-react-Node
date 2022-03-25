import React, { useState } from "react";
import "./InputComponent.css";
import { Button } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../MainComponent";
import moment from "moment";

export const InputComponent = ({ flag, setFlag }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    let time = new Date();
    time = moment(time).format("DD-MM-YYYY HH:mm:ss")
    document.getElementById('loader').style.display = "block";
    axios.post(`${baseUrl}/addtodo`, {title, description, time})
    .then((response) => {
      console.log(response.data);
      setFlag(!flag);
      setTitle("");
      setDescription("");
    })
    .catch((err) => {
      alert(err.response.data.message.msg);
    })
    document.getElementById('loader').style.display = "none";
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
