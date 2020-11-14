import React from "react";
import Head from "next/head";
import Layout from "../components/layout";
import { useUserSWR } from "../lib/hooks";
import Loader from "../components/loader";

export const UserContext = React.createContext({});

export default function MyApp({ Component, pageProps }) {
  const { user, mutate, loading } = useUserSWR();
  const head = (
    <Head>
      <title>FAnfiK</title>
    </Head>
  );
  if (loading) {
    return (
      <>
        {head}
        <Loader />
      </>
    );
  }
  return (
    <UserContext.Provider value={{ user, mutate }}>
      {head}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  );
}
