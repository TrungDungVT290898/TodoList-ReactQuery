import { ISuperHero } from "../models/SuperHero";
import { useQuery, useMutation } from "@tanstack/react-query";
import spHeroesAPI from "../api/spHeroesAPI";
export interface IUseQueryHookProps {
  onSuccess: (data: ISuperHero[]) => void;
  onError: (err: any) => void;
  fetchData: () => Promise<ISuperHero[] | undefined>;
}
export interface IHeroMutationProps {
  onSuccess?: () => void;
  onError?: () => void;
}
export function useAddHeroMutation({ onSuccess, onError }: IHeroMutationProps) {
  return useMutation({
    mutationFn: spHeroesAPI.add,
    onSuccess: onSuccess,
    onError: onError,
  });
}
export function useUpdateHeroMutation({
  onSuccess,
  onError,
}: IHeroMutationProps) {
  return useMutation({
    mutationFn: spHeroesAPI.update,
    onSuccess: onSuccess,
    onError: onError,
  });
}
export function useDeleteHeroMutation({
  onSuccess,
  onError,
}: IHeroMutationProps) {
  return useMutation({
    mutationFn: spHeroesAPI.delete,
    onSuccess: onSuccess,
    onError: onError,
  });
}
function useQuerySpHeroesHook({
  onSuccess,
  onError,
  fetchData,
}: IUseQueryHookProps) {
  return useQuery({
    queryKey: ["rqsuperheroes"],
    queryFn: fetchData,
    cacheTime: 5000,
    onError: onError,
    onSuccess: onSuccess,
  });
}
export default useQuerySpHeroesHook;
