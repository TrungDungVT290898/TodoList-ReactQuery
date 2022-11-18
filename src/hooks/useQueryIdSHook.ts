import { ISuperHero } from "../models/SuperHero";
import { useQuery } from "@tanstack/react-query";
export interface IUseQueryIdHookProps {
  heroId: number | string;
  fetchData: (heroId: number | string) => Promise<ISuperHero | undefined>;
}
function useQueryIdSPHook({ heroId, fetchData }: IUseQueryIdHookProps) {
  return useQuery({
    queryKey: ["rqsuperheroes", heroId],
    queryFn: () => fetchData(heroId),
  });
}
export default useQueryIdSPHook;
