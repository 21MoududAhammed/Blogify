import { useEffect, useState } from "react";
import useAxios from "./useAxios";

const useDebounce = (searchTerm, delay = 300) => {
  const { api } = useAxios();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchTerm) {
          setError(null);
          setLoading(true);
          const response = await api.get(`/search?q=${searchTerm}`);
          if (response?.status === 200) {
            setSearchResult(response?.data?.data);
          }
        } else {
          setSearchResult([]);
        }
      } catch (err) {
        console.log(err);
        setSearchResult([]);
        if (err?.response?.status === 404) {
          setError(err?.response?.data?.message);
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    const timeOut = setTimeout(() => {
      fetchData();
    }, delay);

    // clean up
    return () => clearTimeout(timeOut);
  }, [searchTerm]);

  return { searchResult, loading, error };
};

export default useDebounce;
