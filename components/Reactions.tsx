import Image from 'next/image';

import styles from '../styles/_reactions.module.scss';
import like from '../public/reactions/like.png';
import love from '../public/reactions/love.png';
import dislike from '../public/reactions/dislike.png';
import trash from '../public/reactions/trash.png';
import { useAppContext } from '../context/state';

const Reactions: React.FC = () => {
  const ctx = useAppContext();

  const handleClick = (el: React.MouseEvent<HTMLDivElement>) => {
    const type = el.currentTarget.getAttribute('data-type');
    console.log(type);

  }

  const options = ctx.reactions.map((emote, index) => {
    let src;
    switch (emote.name) {
      case "like": src = like; break;
      case "dislike": src = dislike; break;
      case "love": src = love; break;
      case "trash": src = trash; break;
    }

    return (<div className={styles.option} data-type={emote.name} key={index} onClick={handleClick}>
      <div className={styles.icon}>
        <Image src={src} alt={emote.name} />
      </div>
      <div > 250k </div>
    </div>)

  })

  return (
    <>
      <div className={styles.container}>
        {options}
      </div>
    </>
  )
}

export default Reactions
