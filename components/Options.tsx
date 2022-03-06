import Image from 'next/image';
import Router from 'next/router';

import styles from '../styles/_options.module.scss';
import logo from '../public/logo.png';
import { useAppContext } from '../context/state';
import { useEffect } from 'react';
import Reactions from './Reactions';

import { Reaction } from '../types/Bin';

type OptionsProps = {
  type: "edit" | "view"
  reactions?: Reaction[]
}

const Options: React.FC<OptionsProps> = ({ type, reactions }) => {
  const ctx = useAppContext();

  const saveBin = async () => {

    try {
      const response = await fetch('/api/addBin', {
        method: "POST",
        body: JSON.stringify(ctx)
      })

      const json = await response.json();

      if (json.id)
        setTimeout(() => {
          Router.push(`/${json.id}`);
        }, 250)

    } catch (err) {
      console.error(err);
    }
  }

  const newBin = () => {
    ctx.text = "";
    Router.push('/');
  }

  const edit = () => {
    Router.push(`/edit/${ctx.id}`);
  }

  const about = () => {
    Router.push('/readme');
  }

  useEffect(() => {
    Router.prefetch("/");
    Router.prefetch("/readme");

    if (type === "view")
      Router.prefetch(`/edit/${ctx.id}`)
  }, [ctx.id, type])

  return (
    <>
      <div className={styles.logo} >
        <Image src={logo} alt="ReactBin logo" priority={true} />
      </div>
      <div className={styles.settings}>
        {
          type === "edit" ?
            <>
              <div
                className={styles.button}
                onClick={saveBin}
              >
                save
              </div>
              <div
                className={styles.button}
                onClick={about}
              >about</div>
            </>
            :
            <>
              <div
                className={styles.button}
                onClick={edit}
              >
                edit
              </div>
              <div
                className={styles.button}
                onClick={newBin}
              >
                new
              </div>
              <div
                className={styles.button}
                onClick={about}
              >about</div>
            </>
        }

      </div>
      <div className={styles.reactions} >
        {type !== 'edit' && reactions ? <Reactions data={reactions} /> : null}
      </div>

    </>
  )
}

export default Options
