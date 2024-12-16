// utils/fetchData.ts
import { GetServerSideProps } from 'next';

type FetchServerSideProps = <T extends Record<string, any>>(
  url: string,
  parseProps: (data: any) => T
) => GetServerSideProps<T>;

export const createServerSidePropsFetcher: FetchServerSideProps = (url, parseProps) => {
  return async (context) => {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${context.req.cookies.token}` },
    });

    if (!res.ok) {
      return { redirect: { destination: '/login', permanent: false } };
    }

    const data = await res.json();
    const props = parseProps(data);

    return {
      props,
    };
  };
};
