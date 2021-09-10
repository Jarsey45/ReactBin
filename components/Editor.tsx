import { useState, useEffect, useRef } from 'react'
import useResize from '../hooks/useResize';
import styles from '../styles/_editor.module.scss';

type NumberProps = {
  index: number
}

const Number: React.FC<NumberProps> = ({ index }) => {
  let content = '';

  for (let i = 1; i <= index; i++)
    content += `${i}\n`;

  return <textarea className={styles.number} value={content} readOnly />;

}

const Editor: React.FC = () => {
  const [txtContent, setText] = useState<string>("");
  const [lines, setLines] = useState<number>(3);
  const textArea = useRef<HTMLTextAreaElement | null>(null);
  const resized = useResize();



  const handleText = () => {
    const { current } = textArea;
    if (!current) return;

    //change size of textarea
    current.style.height = "auto";
    current.style.height = (current.scrollHeight) + "px";

    //count lines
    const compStyles = window.getComputedStyle(current);
    const linesNum = Math.floor(parseInt(current.style.height) / parseInt(compStyles.getPropertyValue('line-height')))



    //setting value and lines
    setLines(linesNum);
    setText(current.value);
  }

  //setting right height and lines number
  useEffect(handleText);
  useEffect(handleText, [resized])


  return (
    <div className={styles.editorContainer}>
      <div className={styles.lines}>
        <Number index={lines}></Number>
      </div>
      <div className={styles.editor}>
        <textarea
          className={styles.textarea}
          spellCheck={false}
          ref={textArea}
          onChange={handleText}
          autoFocus
        ></textarea>
      </div>
    </div>
  )
}

export default Editor

