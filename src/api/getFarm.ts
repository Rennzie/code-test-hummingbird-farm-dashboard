import { useState, useEffect } from 'react';
import axios from 'axios';

function useGetFarm() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any | undefined>();

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://www.mocky.io/v2/5cc809b5300000a300055eac')
      .then(res => setData({ getFarm: res.data }))
      .catch(error => console.error('Error fetching farms', error))
      .finally(() => setLoading(false));
  }, [setLoading, setData]);

  return { data, loading };
}

export default useGetFarm;
