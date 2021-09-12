import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/_index.module.scss'

import Layout from '../components/Layout';
import Editor from '../components/Editor';
import Options from '../components/Options';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ReactBin</title>
      </Head>
      <Layout
        editor={<Editor />}
        options={<Options type="edit" />}
      >
      </Layout>
    </>
  )
}

export default Home
