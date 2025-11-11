import { useState } from "react";

export default function useHandle<Args extends any[] = any, TResponse = any>(
  handler: (...args: Args) => Promise<TResponse>
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [errors, setErrors] = useState<Record<string, any> | null>(null);

  const execute = async (...args: Args): Promise<TResponse | undefined> => {
    setLoading(true);
    setErrors(null);
    setError(null);

    try {
      const response = await handler(...args);

      return response;
    } catch (error: any) {
      console.error(error);
      if (error?.response?.status === 422) {
        setErrors(error?.response?.data?.errors);
        setError(null);
      } else {
        setError(error?.response?.data?.message || "Something went wrong");
        setErrors(null);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    errors,
    execute,
  };
}
