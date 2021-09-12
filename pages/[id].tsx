import type { NextPage } from 'next';
import Head from 'next/head';

import Layout from '../components/Layout';
import Editor from '../components/Editor';
import Options from '../components/Options';

import BinModel from '../models/bin';
import connectDBForSSR from '../middleware/ssr_mongodb';

type BinProps = {
  text: string;
  lang: string;
}

const Bin: NextPage<BinProps> = ({ text, lang }) => {
  return (
    <>
      <Head>
        <title>ReactBin</title>
      </Head>
      <Layout
        editor={<Editor content={text} />}
        options={<Options type="view" />}
      >
      </Layout>
    </>
  )
}


// This also gets called at build time
export async function getServerSideProps({ params }: any) {
  const id = params.id;

  //connecting to db
  await connectDBForSSR();

  const found = await BinModel.findById(id).exec();

  if (!found) return {
    props: {
      text: "No bin with id = " + id,
      lang: "txt"
    } as BinProps
  }

  return {
    props: {
      text: found.get("text"),
      lang: found.get("lang")
    } as BinProps
  }
}

export default Bin;