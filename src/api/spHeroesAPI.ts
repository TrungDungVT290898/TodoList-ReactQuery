import { ISuperHero } from "../models/SuperHero";
import axiosClient from "./axiosClient";
const spHeroesAPI = {
  getAll: async () => {
    try {
      const data = await axiosClient.get("/superheroes");
      return data.data as ISuperHero[];
    } catch (error) {}

    return undefined;
  },
  getById: async (id: number | string) => {
    try {
      const data = await axiosClient.get(`/superheroes/${id}`);
      return data.data as ISuperHero;
    } catch (error) {}

    return undefined;
  },
  add: async (newHero: ISuperHero) => {
    try {
      await axiosClient.post("/superheroes", newHero);
    } catch (error) {}
  },
  update: async (updateHero: ISuperHero) => {
    try {
      await axiosClient.patch(`/superheroes/${updateHero.id}`, updateHero);
    } catch (error) {
      console.log("error when patch", error);
    }
  },
  delete: async (deleteHero: number) => {
    try {
      await axiosClient.delete(`/superheroes/${deleteHero}`);
    } catch (error) {}
  },
};
export default spHeroesAPI;
