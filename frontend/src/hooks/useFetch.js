import { useState, useEffect } from "react";

/**
 * Custom hook for fetching data from an API
 * @param {Function} fetchFunction - The async function to fetch data
 * @param {Array} dependencies - Dependencies array for useEffect
 */
export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchFunction();
        setData(result);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error };
};
