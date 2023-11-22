import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Open_Sans } from 'next/font/google';
import useSWR, { SWRConfig } from 'swr';

const openSans = Open_Sans({ subsets: ['latin'], weight: ['400', '700'] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  // const [posts, setPosts] = useState([]);
  // const [specificUser, setSpecificUser] = useState();
  // const [comments, setComments] = useState([]);
  // const [admins, setAdmins] = useState();

  // const getAllPosts = async () => {
  //   const response = await fetch('/api');
  //   const allPosts = await response.json();

  //   if (!response.ok) {
  //     console.log(response.error);
  //   }

  //   setPosts(allPosts);
  // };

  // const getComments = async () => {
  //   const response = await fetch(`/api/comments`);
  //   const comments = await response.json();
  //   setComments(comments);
  // };

  // const getAdmins = async () => {
  //   const response = await fetch(`/api/users`);
  //   const users = await response.json();
  //   setAdmins(users);
  // };

  // const fetchSpecficUser = async (id) => {
  //   const response = await fetch(`/api/user/${id}`);
  //   const user = await response.json();
  //   // setSpecificUser(user)
  //   return user;
  // };

  // useEffect(() => {
  //   getAdmins();
  //   getAllPosts();
  //   getComments();
  // }, []);

  return (
    <SWRConfig
      value={{
        // refreshInterval: 3000,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <SessionProvider session={session}>
        <main className={openSans.className}>
          <Layout>
            <Component
              {...pageProps}
              // posts={posts}
              // comments={comments}
              // getComments={getComments}
              // getAllPosts={getAllPosts}
              // handleFetchSpecificUser={fetchSpecficUser}
            />
          </Layout>
        </main>
      </SessionProvider>
    </SWRConfig>
  );
}
