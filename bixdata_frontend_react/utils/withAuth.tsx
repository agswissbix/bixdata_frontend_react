// pages/withAuth.tsx
import { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from './axios';
import { useState } from 'react';



const withAuth = (WrappedComponent: NextPage, url: string) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const [response, setResponse] = useState<any>(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.post(url + '/', {data: "Some data"});
          setAuthorized(true);
          setResponse(response.data);

        } catch (error) {
          setAuthorized(false);
          router.push('/login');
        }
      };

      fetchData();
    }, [router]);

    if (authorized) {
      console.info(response);
      return <WrappedComponent response={response} />;
    }
  };

  return AuthenticatedComponent;
};

export default withAuth;

