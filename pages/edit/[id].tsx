import type { NextPage } from 'next';
import Head from 'next/head';

import Layout from '../../components/Layout';
import Editor from '../../components/Editor';
import Options from '../../components/Options';

import BinModel from '../../models/bin';
import connectDBForSSR from '../../middleware/ssr_mongodb';
import { useAppContext } from '../../context/state';

type BinEditProps = {
  text: string;
  lang: string;
  id: string
}

const BinEdit: NextPage<BinEditProps> = ({ text, lang, id }) => {
  const ctx = useAppContext().State;

  ctx.id = id;
  ctx.lang = lang;
  ctx.text = text;

  return (
    <>
      <Head>
        <title>ReactBin</title>
      </Head>
      <Layout
        editor={<Editor editText={text} />}
        options={<Options type="edit" />}
        type="edit"
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

  if (!found)
    return {
      props: {
        text: "No bin with id = " + id,
      } as BinEditProps
    }

  return {
    props: {
      text: found.get("text"),
      lang: found.get("lang"),
      id
    } as BinEditProps
  }
}

export default BinEdit;