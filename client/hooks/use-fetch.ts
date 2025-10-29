import { useCallback, useEffect, useState } from "react";

export default function useFetch(handler: () => Promise<any>) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const reload = useCallback(async () => {
    try {
      const response = await handler();
      setData(response.data.data);
    } catch (error: any) {
      console.error(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }, [handler]);

  useEffect(() => {
    reload();
  }, [reload]);

  return {
    data,
    loading,
    error,
    reload,
  };
}
