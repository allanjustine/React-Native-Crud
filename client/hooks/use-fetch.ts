import api from "@/lib/api";
import { useCallback, useEffect, useRef, useState } from "react";

export default function useFetch(url: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debounceRef = useRef<number | null>(null);

  const reload = useCallback(async () => {
    const payload = {
      params: {
        search: searchTerm,
      },
    };

    try {
      const response = await api.get(url, payload);
      setData(response?.data?.data);
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }, [url, searchTerm]);

  useEffect(() => {
    reload();
  }, [reload]);

  const handleSearchTerm = (value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setSearchTerm(value);
    }, 500);
  };

  return {
    data,
    loading,
    error,
    reload,
    searchTerm,
    handleSearchTerm,
  };
}
