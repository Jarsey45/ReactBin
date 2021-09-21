import { CSSProperties, useState } from 'react';
import { useAppContext } from '../context/state';

import Image from 'next/image';
import burgerIcon from '../public/burger.svg';
import closeIcon from '../public/close.svg';
import copyIcon from '../public/copy.svg';
import styles from '../styles/_index.module.scss';

type Props = {
  editor: JSX.Element
  options: JSX.Element
}

const Layout: React.FC<Props> = ({ editor, options }) => {
  const ctx = useAppContext();
  const [optionStyle, setStyle] = useState<CSSProperties>({});

  const copyText = () => {
    copyTextToClipboard(ctx.text);
  }

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
              setStyle({ right: '-50vw' })
          }}>
          {
            optionStyle.right === 0 ?
              <Image src={closeIcon} alt="menu" priority={true} />
              :
              <Image src={burgerIcon} alt="menu" priority={true} />
          }
        </div>
        <div className={styles.copy} onClick={copyText}>
          <Image src={copyIcon} alt="copy" priority={true} />
        </div>
      </div>
    </div>
  )
}


function fallbackCopyTextToClipboard(text: string) {
  try {
    var successful = document.execCommand('copy');
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }
}
function copyTextToClipboard(text: string) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(() => {}, function (err) {
    console.error('Async: Could not copy text: ', err);
  });
}


export default Layout