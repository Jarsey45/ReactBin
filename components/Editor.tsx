import { useState, useEffect, useRef } from 'react'
import hljs from 'highlight.js/lib/common'
import autosize from 'autosize';
import useResize from '../hooks/useResize';
import { useAppContext } from '../context/state';

import styles from '../styles/_editor.module.scss';

type EditorProps = {
  content?: string
}

type NumberProps = {
  index: number
}

const Number: React.FC<NumberProps> = ({ index }) => {
  let content = '';

  for (let i = 1; i <= index; i++)
    content += `${i}\n`;

  return <textarea className={styles.number} value={content} readOnly />;

}

const Editor: React.FC<EditorProps> = ({ content }) => {
  const ctx = useAppContext();
  const [lines, setLines] = useState<number>(1);
  const textArea = useRef<HTMLTextAreaElement | HTMLPreElement | null>(null);
  const linesArea = useRef<HTMLDivElement | null>(null);
  const codeArea = useRef<HTMLElement | null>(null);
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

    linesArea.current.style.height = content ? (current.scrollHeight + 2 * lineHeight) + "px" : (current.scrollHeight + 1.75 * lineHeight) + "px";

    //count lines
    const linesNum = Math.floor(current.scrollHeight / lineHeight)


    //setting value and lines
    setLines(linesNum);
    //@ts-ignore
    ctx.text = current.value;
  }

  //TODO highlight  
  // useEffect(() => {
  //   if (!codeArea.current) return;

  //   hljs.configure({ ignoreUnescapedHTML: true })
  //   hljs.highlightElement(codeArea.current);
  //   console.log('hljs')

  // });

  //setting right height and lines number
  useEffect(handleText);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleText, [resized])


  return (
    <div className={styles.editorContainer}>
      <div className={styles.lines} ref={linesArea}>
        <Number index={lines}></Number>
      </div>
      <div className={styles.editor}>
        {
          content ?
            //@ts-ignore
            <pre ref={textArea}><code className={styles.code} ref={codeArea}>{content}</code></pre>
            :
            <textarea
              className={styles.textarea}
              spellCheck={false}
              //@ts-ignore
              ref={textArea}
              onChange={handleText}
              maxLength={100000}
              autoFocus
            ></textarea>
        }
      </div>
    </div>
  )
}

export default Editor

