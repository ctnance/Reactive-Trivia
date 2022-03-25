import React from "react";

export default function DataFetcher(props) {
  const [fetcherData, setFetcherData] = React.useState({
    loading: true,
    data: null,
    action: props.action,
    error: null,
  });

  async function fetchData() {
    try {
      let response = await fetch(props.url);
      let data = await response.json();
      if (response.ok) {
        setFetcherData((prevData) => ({
          ...prevData,
          data: data,
          loading: false,
        }));
      } else {
        throw Error("Error fetching trivia data!");
      }
    } catch (error) {
      // Update error in fetch data if response not successful
      setFetcherData((prevData) => ({ ...prevData, loading: false, error: error }));
    }
  }

  React.useEffect(() => {
    setFetcherData((prevData) => ({ ...prevData, loading: true }));
    fetchData();
  }, []);

  return props.children(fetcherData);
}

DataFetcher.defaultProps = {
  action: undefined,
};
