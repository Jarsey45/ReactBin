import { CSSProperties, useEffect, useState } from 'react';
import { useAppContext } from '../context/state';
import { v4 as uuidv4 } from 'uuid';
import type { NextPage } from 'next'
import Toast from './toasts/Toast';

import Image from 'next/image';
import burgerIcon from '../public/burger.svg';
import closeIcon from '../public/close.svg';
import copyIcon from '../public/copy.svg';
import styles from '../styles/_index.module.scss';

type Props = {
  editor: JSX.Element
  options: JSX.Element
  type: 'edit' | 'view'
}

const Layout: NextPage<Props> = ({ editor, options, type }) => {
  const ctx = useAppContext().State;
  const { addToast, removeToast, Toasts } = useAppContext();
  const [optionStyle, setStyle] = useState<CSSProperties>({});



  return (
    <div className={styles.app}>
      <div className={styles.container} >
        {editor}
        <div className={styles.optionBar} style={optionStyle}>
          {options}
        </div>
        <div className={styles.burger}
          onClick={() => {
            if (optionStyle.right !== 0)
              setStyle({ right: 0 })
            else
              setStyle({ right: 'min(-50vw, -230px)' })
          }}>

          {
            optionStyle.right === 0 ?
              <Image src={closeIcon} layout="fill" alt="menu" priority={true} />
              :
              <Image src={burgerIcon} layout="fill" alt="menu" priority={true} />
          }

        </div>
        {
          type === "view" ?
            <div className={styles.copy}
              onClick={() => {

                addToast({
                  id: uuidv4(),
                  type: "info",
                  message: "bin coppied",
                  deleteToast: () => {removeToast('aa')} //it is not needed, but i want it xD
                });

                copyTextToClipboard(ctx.text);
              }}>
              <Image src={copyIcon} layout="fill" alt="copy" priority={true} />
            </div>
            :
            null
        }

        <div className={styles.toasts}>
          {
            Toasts.map((toast) => {
              return <Toast
                key={toast.id}
                id={toast.id}
                message={toast.message}
                deleteToast={() => removeToast(toast.id)}
                type={toast.type}
              />
            })
          }
        </div>

      </div>
    </div>
  )
}


function fallbackCopyTextToClipboard(text: string) {
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }
}
function copyTextToClipboard(text: string) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(() => { }, function (err) {
    console.error('Async: Could not copy text: ', err);
  });
}


export default Layout