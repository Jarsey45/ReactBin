import type { NextPage } from 'next'
import Head from 'next/head'
import connectDBForSSR from '../middleware/ssr_mongodb';
import styles from '../styles/_index.module.scss'

import Layout from '../components/Layout';
import Editor from '../components/Editor';
import Options from '../components/Options';



const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>ReactBin</title>
        <meta property='og:url' content="react-bin.vercel.app"/>
        <meta property='og:type' content='website' />
        <meta property='og:description' content='Create and share your code :)'/>
        <meta property='og:image' content={'../public/logo.png'}/>
      </Head>
      <Layout
        editor={<Editor />}
        options={<Options type="edit" />}
        type="edit"
      />
    </>
  )
}


// connect to db while loading page
export async function getServerSideProps({ params }: any) {
  //connecting to db
  await connectDBForSSR();
  return { props: {}};
}

export default Home
