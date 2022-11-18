import { IFriend } from "../models/Friend";
import axiosClient from "./axiosClient";

const friendAPI = {
  getAll: async () => {
    try {
      const data = await axiosClient.get("/friend");
      return data.data as IFriend[];
    } catch (error) {}
    return undefined;
  },
  getById: async (id: number | string) => {
    try {
      const data = await axiosClient.get(`/friend/${id}`);
      return data.data as IFriend;
    } catch (error) {}
    return undefined;
  },
};
