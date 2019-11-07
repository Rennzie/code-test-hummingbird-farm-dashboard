import { useState, useEffect } from 'react';
import axios from 'axios';

function useGetCrops() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any | undefined>();

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://www.mocky.io/v2/5cc8098e300000a300055eab')
      .then(res => setData({ crops: res.data }))
      .catch(error => console.error('Error fetching farms', error))
      .finally(() => setLoading(false));
  }, [setLoading, setData]);

  return { data, loading };
}

export default useGetCrops;
