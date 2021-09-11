import { useState, useEffect, useRef } from 'react'
import autosize from 'autosize';
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
  const [lines, setLines] = useState<number>(1);
  const textArea = useRef<HTMLTextAreaElement | null>(null);
  const linesArea = useRef<HTMLDivElement | null>(null);
  const resized = useResize();



  const handleText = () => {
    const { current } = textArea;
    if (!current || !linesArea.current) return;

    //get style and line height
    const compStyles = window.getComputedStyle(current);
    const lineHeight = parseInt(compStyles.getPropertyValue('line-height'));

    //change size of textarea
    autosize(current);

    //change size of linesArea depending on textarea
    linesArea.current.style.height = (current.scrollHeight + 1.75 * lineHeight) + "px";

    //count lines
    const linesNum = Math.floor(current.scrollHeight / lineHeight)


    //setting value and lines
    setLines(linesNum);
    setText(current.value);
  }

  //setting right height and lines number
  useEffect(handleText);
  useEffect(handleText, [resized])


  return (
    <div className={styles.editorContainer}>
      <div className={styles.lines} ref={linesArea}>
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

