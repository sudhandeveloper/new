import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const postThunk = createAsyncThunk("data/postData", async (postData) => {
  const response = await axios.post("http://localhost:8080/users", postData);
  return response.data;
});

export const getThunk = createAsyncThunk("data/getData", async () => {
  const response = await axios.get("http://localhost:8080/users");
  return response.data;
});

export const deleteThunk = createAsyncThunk("data/deleteData", async (id) => {
  const response = await axios.delete(`http://localhost:8080/users/${id}`);
  return response.data;
});

export const editeThunk = createAsyncThunk("data/EDITData", async ({ id, updateuser }) => {
  const response = await axios.put(`http://localhost:8080/users/${id}`, updateuser);
  return response.data;
});
