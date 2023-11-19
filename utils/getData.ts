async function getData(query: string, init?: RequestInit | undefined) {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const requestOptions: RequestInit = {
    headers: {
      ...defaultHeaders,
      ...init?.headers
    },
    ...init,
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}${query}`, requestOptions);

  const data = await res.json();

  // if (!res.ok) throw new Error("Failed to fetch data");

  return data;
}


export { getData };
