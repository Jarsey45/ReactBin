import Image from 'next/image';

import styles from '../styles/_options.module.scss';
import logo from '../public/logo.png';

const Options: React.FC = () => {
  return (
    <>
      <div className={styles.logo} >
        <Image src={logo} alt="ReactBin logo" priority={true} />
      </div>
      <div className={styles.settings}>
        <div className={styles.button}>save</div>
        <div className={styles.button}>new</div>
        <div className={styles.button}>share</div>
      </div>
      <div className={styles.reactions} >reactions</div>
    </>
  )
}

export default Options
