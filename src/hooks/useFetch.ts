/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { githubAPI } from "../services/api";

export function useFetch<T = unknown>(url: string, options?: AxiosRequestConfig){
  
  const [fetchedData, setFetchedData] = useState<T | null>(null)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    githubAPI.get(url, options)
    .then(response => {
      setFetchedData(response.data)
    })
    .catch((err) => {
      setError(err)
    })
    .finally(() => {
      setIsFetching(false)
    })
  },[])

  return { fetchedData, error, isFetching }
}