import { useEffect, useState } from "react";
import api from "../api";

const useFetchData = (fetchUrl) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`${fetchUrl}`);
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetchData;