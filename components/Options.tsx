import Image from 'next/image';
import Router from 'next/router';
import { v4 as uuidv4 } from 'uuid';

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
  const ctx = useAppContext().State;
  const { addToast, removeToast } = useAppContext();

  const saveBin = async () => {
    addToast({
      type: "info",
      message: "Creating new bin...",
      deleteToast: () => { removeToast('aa') } //it is not needed, but i want it xD
    });

    try {
      const response = await fetch('/api/addBin', {
        method: "POST",
        body: JSON.stringify(ctx)
      })

      const json = await response.json();

      if(json.error) throw json.error;

      if (json.id)
        setTimeout(() => {
          Router.push(`/${json.id}`);

          addToast({
            type: "success",
            message: "Bin created successfully",
            deleteToast: () => {removeToast('aa')} //it is not needed, but i want it xD
          });

        }, 250)

    } catch (err) {

      addToast({
        type: "warning",
        message: `${err}`,
        deleteToast: () => {removeToast('aa')} //it is not needed, but i want it xD
      });
    }
  }

  const newBin = () => {
    ctx.text = "";
    Router.push('/');

    addToast({
      type: "info",
      message: "You are now in edit mode",
      deleteToast: () => {removeToast('aa')} //it is not needed, but i want it xD
    });
  }

  const edit = () => {
    Router.push(`/edit/${ctx.id}`);
    addToast({
      type: "info",
      message: "You are now in edit mode",
      deleteToast: () => {removeToast('aa')} //it is not needed, but i want it xD
    });
  }

  const about = () => {
    Router.push('/readme');
  }

  useEffect(() => {
    Router.prefetch("/");
    Router.prefetch("/readme");

    if (type === "view")
      Router.prefetch(`/edit/${ctx.id}`);

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
