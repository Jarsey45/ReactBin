import type { NextPage } from 'next'
import { useState, useEffect, useRef, KeyboardEventHandler } from 'react'
import hljs from 'highlight.js/lib/common'
import autosize from 'autosize';
import useResize from '../hooks/useResize';
import { useAppContext } from '../context/state';

import 'highlight.js/styles/github-dark.css';
import styles from '../styles/_editor.module.scss';

type EditorProps = {
  content?: string
  editText?: string
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

const Editor: NextPage<EditorProps> = ({ content, editText }) => {
  const ctx = useAppContext().State;
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

    if (current.tagName === "PRE") return;  //@ts-ignore
    ctx.text = current.value;
  }


  const handleTab: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key == 'Tab' && e.target !== null) {
      e.preventDefault();

      const target = e.target as HTMLTextAreaElement;

      let start = target.selectionStart;
      let end = target.selectionEnd;

      target.value = target.value.substring(0, start) + "\t" + target.value.substring(end);

      target.selectionStart = target.selectionEnd = start + 1;
    }

  }

  const handleFocus = () => {
    if (textArea.current === null) return;

    textArea.current.focus();
  }

  const highlightCode = () => {
    if (!codeArea.current) return;
    // console.log(codeArea.current.innerHTML);

    hljs.configure({ ignoreUnescapedHTML: true })
    hljs.highlightElement(codeArea.current);
  }

  //editText was set
  useEffect(() => {
    if (editText && textArea.current !== null && textArea.current.tagName !== "PRE")
      (textArea.current as HTMLTextAreaElement).value = editText;
  }, [editText])


  //component mount and update
  useEffect(() => {
    highlightCode()
    //setting right height and lines number
    handleText()
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleText, [resized])


  return (
    <div className={styles.editorContainer} onClick={handleFocus}>
      <div className={styles.lines} ref={linesArea}>
        <Number index={lines}></Number>
      </div>
      <div className={styles.editor}>
        {
          content ? //@ts-ignore
            <pre ref={textArea}><code className={styles.code} ref={codeArea} >{content}</code></pre>
            :
            <textarea
              className={styles.textarea}
              spellCheck={false} //@ts-ignore
              ref={textArea}
              onChange={handleText}
              onKeyDown={handleTab}
              maxLength={100000}
              autoFocus
            />
        }
      </div>
    </div>
  )
}

export default Editor

