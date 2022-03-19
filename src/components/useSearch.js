import { useEffect, useState } from "react";
import axios from "axios";

export default function useSearch(phrase, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [launches, setLaunches] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const perPage = 15;

  useEffect(() => {
    setLaunches([]);
  }, [phrase]);

  useEffect(() => {
    const newPage = pageNumber * perPage;
    const query = `{
      launchesPast(limit: ${perPage}, offset: ${newPage}, find: { mission_name: "${phrase}" } ) {
        mission_name
        id
      }
    }
    `;

    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "post",
      url: "https://api.spacex.land/graphql/",
      data: { query: query },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        if (res.data.data.launchesPast === null) {
          res.data.data.launchesPast = [];
        }
        if (res.data.errors) {
          setError(true);
        }
        setLaunches((prevLaunches) => {
          return [
            ...prevLaunches,
            ...res.data.data.launchesPast.map((launch) => launch),
          ];
        });
        setHasMore(res.data.data.launchesPast.length === perPage);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        console.error(err);
        setError(true);
      });
    return () => cancel();
  }, [phrase, pageNumber]);
  return { loading, error, launches, hasMore };
}
