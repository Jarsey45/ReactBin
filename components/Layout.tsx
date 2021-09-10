import styles from '../styles/_index.module.scss';

type Props = {
  editor: JSX.Element
  options: JSX.Element
}

const Layout: React.FC<Props> = ({ editor, options }) => {
  return (
    <div className={styles.app}>
      <div className={styles.container} >
        {editor}
        <div className={styles.optionBar}>
          {options}
        </div>
      </div>
    </div>
  )
}

export default Layout