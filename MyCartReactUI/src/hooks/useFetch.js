import { useState, useEffect } from "react";

export default function useFetch(url) {

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);


  useEffect(() => {

    const loadData = async () => {
      setIsPending(true);
      try{
        const res = await fetch(url);
        if(!res.ok) throw new Error(res.statusText);

        const json = await res.json();
        
        setIsPending(false)
        setData(json);
      }
      catch (err) {
        setIsPending(false);
        setError(err.message);
      }
    }

    loadData();

  }, [url]);

  return { data, isPending, error}
}
