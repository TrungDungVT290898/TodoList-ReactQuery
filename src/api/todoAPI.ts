import axiosClient from "./axiosClient";
import { IToDo } from "../models/Todo";

const todoAPI = {
  getAll: async () => {
    try {
      const data = await axiosClient.get("/todos");
      return data.data as IToDo[];
    } catch (error) {}

    return undefined;
  },
  add: async (newItem: IToDo) => {
    try {
      const data = await axiosClient.post("/todos", newItem);
      return data.data as IToDo;
    } catch (error) {}

    return undefined;
  },
  update: async (newItem: IToDo) => {
    try {
      const data = await axiosClient.patch(`/todos/${newItem.id}`, newItem);
      console.log(data);
      return data.data as IToDo;
    } catch (error) {}

    return undefined;
  },
  remove: async (itemID: number) => {
    try {
      const data = await axiosClient.delete(`/todos/${itemID}`);
    } catch (error) {}
  },
};
export default todoAPI;
