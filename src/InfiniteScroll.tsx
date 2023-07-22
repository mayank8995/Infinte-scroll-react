import * as React from 'react';
import View from './View';

export default function InfiniteScroll() {
  const [response, setResponse] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  async function getData() {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?` +
        new URLSearchParams({
          _limit: 9,
          _page: page,
        } as any)
    );
    const data = await res.json();
    setResponse((prevState: any) => [...prevState, ...data] as any);
    setLoading(false);
  }
  React.useEffect(() => {
    getData();
  }, [page]);
  React.useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => window.removeEventListener('scroll', handleInfiniteScroll);
  }, []);

  async function handleInfiniteScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop + 2 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((prev) => prev + 1);
    }
  }
  return (
    <>
      <View response={response} />
      {loading && <div className="loading"> </div>}
    </>
  );
}
