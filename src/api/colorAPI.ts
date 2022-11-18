import { IColor } from "../models/Color";
import axiosClient from "./axiosClient";
const colorsAPI = {
  getAll: async () => {
    try {
      const data = await axiosClient.get("/colors");
      return data.data as IColor[];
    } catch (error) {}

    return undefined;
  },
  getById: async (id: number | string) => {
    try {
      const data = await axiosClient.get(`/superheroes/${id}`);
      return data.data as IColor;
    } catch (error) {}

    return undefined;
  },
};
export default colorsAPI;
