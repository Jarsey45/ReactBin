import { CSSProperties, useState } from 'react';

import Image from 'next/image';
import burgerIcon from '../public/burger.svg';
import closeIcon from '../public/close.svg';
import styles from '../styles/_index.module.scss';

type Props = {
  editor: JSX.Element
  options: JSX.Element
}

const Layout: React.FC<Props> = ({ editor, options }) => {
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
              setStyle({ right: '-50vw' })
          }}>

          {
            optionStyle.right === 0 ?
              <Image src={closeIcon} alt="menu" priority={true}/>
              :
              <Image src={burgerIcon} alt="menu" priority={true}/>
          }

        </div>
      </div>
    </div>
  )
}

export default Layout