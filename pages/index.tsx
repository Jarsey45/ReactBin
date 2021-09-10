import type { NextPage } from 'next'
import styles from '../styles/_index.module.scss'

import Layout from '../components/Layout';
import Editor from '../components/Editor';

const Home: NextPage = () => {
  return (
    <Layout
      editor={<Editor />}
      options={<></>}
    >
    </Layout>
  )
}

export default Home
