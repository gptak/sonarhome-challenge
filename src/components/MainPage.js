import { useRef, useCallback } from "react";
import { Link } from "react-router-dom";

function MainPage({
  launches,
  hasMore,
  loading,
  error,
  phrase,
  handleSearch,
  setPageNumber,
}) {
  const observer = useRef();
  const lastLaunchElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, setPageNumber]
  );

  return (
    <div className="container">
      <label htmlFor="search" autoComplete="off">
        Search:
      </label>
      <input
        id="search"
        type="text"
        value={phrase}
        onChange={handleSearch}
      ></input>
      {launches.map((launch, index) => {
        if (launches.length === index + 1) {
          return (
            <Link
              to={launch.id}
              className="link"
              ref={lastLaunchElementRef}
              key={launch.id}
            >
              {launch.mission_name}
            </Link>
          );
        } else {
          return (
            <Link to={launch.id} className="link" key={launch.id}>
              {launch.mission_name}
            </Link>
          );
        }
      })}
      <div className="link">{loading && "Loading..."}</div>
      <div className="link">
        {error && "Error. Wait a few seconds and try again or refresh page."}
      </div>
    </div>
  );
}

export default MainPage;
