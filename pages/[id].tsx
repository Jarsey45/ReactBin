import type { NextPage } from 'next';
import Head from 'next/head';

import Layout from '../components/Layout';
import Editor from '../components/Editor';
import Options from '../components/Options';

import BinModel from '../models/bin';
import type { Reaction } from '../types/Bin';
import connectDBForSSR from '../middleware/ssr_mongodb';
import { useAppContext } from '../context/state';

type BinProps = {
  text: string;
  lang: string;
  id: string | null;
  reactions: Reaction[];
}

const Bin: NextPage<BinProps> = ({ text, lang, id, reactions }) => {
  const ctx = useAppContext();

  ctx.id = id;
  ctx.lang = lang;
  ctx.text = text;

  return (
    <>
      <Head>
        <title>ReactBin</title>
        <meta property='og:url' content="react-bin.vercel.app" />
        <meta property='og:type' content='website' />
        <meta property='og:description' content='Your friends sends you a code snippet 8)' />
        <meta property='og:image' content={'../public/logo.png'} />
      </Head>
      <Layout
        editor={<Editor content={text} />}
        options={<Options type="view" reactions={reactions} />}
        type="view"
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
      lang: "txt",
      id: null,
    } as BinProps
  }

  //shitty parse from mongoose object
  const reactions = JSON.parse(JSON.stringify(found.get('reactions'))) as Reaction[];

  return {
    props: {
      text: found.get("text"),
      lang: found.get("lang"),
      id,
      reactions
    } as BinProps
  }
}

export default Bin;