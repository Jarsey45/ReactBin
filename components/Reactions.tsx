import { useEffect, useState } from 'react';
import type {NextPage} from 'next';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';

import { Reaction } from '../types/Bin';


import styles from '../styles/_reactions.module.scss';
import like from '../public/reactions/like.png';
import love from '../public/reactions/love.png';
import dislike from '../public/reactions/dislike.png';
import trash from '../public/reactions/trash.png';
import { useAppContext } from '../context/state';

type ReactionsProps = {
  data: Reaction[];
}

type Chosen = {
  status: boolean;
  _id: string;
}

const Reactions: NextPage<ReactionsProps> = ({ data }) => {
  const [reactions, setReactions] = useState(data);
  const { addToast, removeToast } = useAppContext();
  const [chosen, setChosen] = useState<Chosen>({ status: false, _id: '' });


  useEffect(() => {
    setReactions(data);
    setChosen({ status: false, _id: '' })


    for (let react of data) {
      let doesExist = localStorage.getItem(react._id)
      if (doesExist === 'true') {
        setChosen({ status: true, _id: react._id });
        break;
      }
    }
  }, [data])


  const handleAddReaction = async (action: ('increment' | 'decrement'), _id: string,) => {
    const data = { _id, action };

    //set this before to not bombard it with requests
    setReactions(prev => {
      prev.forEach((el) => el.chosen = false);
      const reactionIndex = prev.findIndex(obj => obj._id === _id);
      prev[reactionIndex].chosen = !prev[reactionIndex].chosen;

      return [...prev];
    });

    //set isChosen to true if not 'decrement'
    if (action === 'increment') {
      setChosen({ _id, status: true });
      //set localStorage
      localStorage.setItem(_id, 'true');

      //add toast
      addToast({
        type: "success",
        message: "Reaction added",
        deleteToast: () => {removeToast('aa')} //it is not needed, but i want it xD
      });

    } else {
      //remove localStorage
      localStorage.removeItem(_id);

      //add toast
      addToast({
        type: "success",
        message: "Reaction added",
        deleteToast: () => {removeToast('aa')} //it is not needed, but i want it xD
      });
    }



    try {
      const response = await fetch('/api/addReactions', {
        method: "POST",
        body: JSON.stringify(data)
      })

      const { newCount } = await response.json();



      //update component state with correct value of reactions
      setReactions(prev => {
        prev.forEach((el) => el.chosen = false);
        const reactionIndex = prev.findIndex(obj => obj._id === _id);
        prev[reactionIndex].number = newCount; // dangerous

        return [...prev];
      });

    } catch (err) {
      console.error(err);
    }
  }

  const handleClick = async (el: React.MouseEvent<HTMLDivElement>) => {
    //if is already selected - do nothin'
    const isSelected = el.currentTarget.getAttribute('data-selected');
    if (isSelected === 'true') return;

    const _id = el.currentTarget.getAttribute('data-id') ?? '';
    if (chosen.status)
      await handleAddReaction('decrement', chosen._id);
    await handleAddReaction('increment', _id);

    
  }

  const options = reactions.map((emote, index) => {
    let src;
    switch (emote.name) {
      case "like": src = like; break;
      case "dislike": src = dislike; break;
      case "love": src = love; break;
      case "trash": src = trash; break;
    }


    const selected = (emote._id === chosen._id || emote.chosen === true ? true : false);
    return (
      <div className={`${styles.option} ${(chosen.status && !selected ? styles.notSelected : '')}`} data-type={emote.name} data-id={emote._id} data-selected={selected} key={index} onClick={handleClick}>
        <div className={styles.icon}>
          <Image src={src} alt={emote.name} priority={true}/>
        </div>
        <div className={styles.count} > {emote.number} </div>
      </div>
    );

  });

  return (
    <>
      <div className={styles.container}>
        {options}
      </div>
    </>
  )
}



export default Reactions
