import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function Joke() {
  const [id, setId] = useState(0);
  /*
  const [joke, setJoke] = useState();

  useEffect(() => {
    async function startFetching() {
      const response = await fetch(
        `https://example-apis.vercel.app/api/bad-jokes/${id}`
      );
      const newJoke = await response.json();

      setJoke(newJoke);
    }

    startFetching();
  }, [id]);

  */

  const { data: joke } = useSWR(
    `https://example-apis.vercel.app/api/bad-jokes/${id}`,
    fetcher
  );

  function handlePrevJoke() {
    setId(joke.prevId);
  }

  function handleNextJoke() {
    setId(joke.nextId);
  }

  if (!joke) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <small>ID: {id}</small>
      <h1>{joke.joke}</h1>
      <div>
        <button type="button" onClick={handlePrevJoke}>
          ← Prev Joke
        </button>
        <button type="button" onClick={handleNextJoke}>
          Next Joke →
        </button>
      </div>
    </>
  );
}
