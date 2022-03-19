import { useEffect, useState } from "react";
import axios from "axios";
import SlickSlider from "./SlickSlider";

function LaunchPage({ launchId }) {
  const [info, setInfo] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const query = `{
    launch(id: "${launchId}") {
      links {
        flickr_images
      }
      details
      rocket {
        rocket_name
      }
      mission_name
      launch_date_utc
      launch_success
    }
  }`;

  useEffect(() => {
    axios({
      method: "post",
      url: "https://api.spacex.land/graphql/",
      data: { query: query },
    })
      .then((res) => {
        if (res.data.errors) {
          setError(true);
        } else {
          setInfo(res.data.data.launch);
        }
        setLoaded(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [launchId, query]);

  return loaded ? (
    <>
      <div className="container">
        <h2>{info?.mission_name}</h2>
        <h3>
          <span>{info?.launch_date_utc.slice(0, 10)}</span>
          <span>{info?.rocket?.rocket_name}</span>
        </h3>
        {info.details ? <p>{info.details}</p> : null}
        <h4>{`Succes:  ${info.launch_success ? "YES" : "NO"}`}</h4>
        {error && <div>Error. Something went wrong.</div>}
      </div>
      {info.links?.flickr_images?.length > 0 ? (
        <div className="slider">
          <SlickSlider links={info.links.flickr_images} />
        </div>
      ) : null}
    </>
  ) : (
    <div className="container">Loading...</div>
  );
}

export default LaunchPage;
