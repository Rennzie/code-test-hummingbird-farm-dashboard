import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Returns a object with `data`,  `loading` and `error`
 * `data` contains a farm object with `name`, `center` and list of `fields`.
 *    - It is `undefined` until the request complete
 * `loading` is `true` while request is in flight, otherwise `false`
 * `error` is `undefined` unless a network error is returned
 */
function useGetFarm() {
  const [data, setData] = useState<any | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://www.mocky.io/v2/5cc809b5300000a300055eac')
      .then(res => setData({ farm: res.data }))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [setLoading, setData]);

  return { data, loading, error };
}

export default useGetFarm;
