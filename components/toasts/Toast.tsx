import Image from 'next/image';
import type { NextPage } from 'next';

import closeIcon from '../../public/close.svg';
import styles from '../../styles/toasts/_toasts.module.scss';
import { useEffect, useState } from 'react';
import useTimer from '../../hooks/useTimer';

export type ToastProps = {
  id?: string;
  message: string;
  type: "warning" | "info" | "success";
  deleteToast: () => void;
}

enum TOAST_CONFIG {
  TOAST_DURATION = 5100 //miliseconds
}

const Toast: NextPage<ToastProps> = ({ message, type, deleteToast }) => {
  const timer = useTimer(); //TODO: naprawic ten timer błedy

  useEffect(() => {

    if (timer >= TOAST_CONFIG.TOAST_DURATION)
      deleteToast();

  }, [timer, deleteToast])


  return (
    <div className={styles.toast} data-type={type}>
      <div className={styles.message}>{message}</div>
      <div className={styles.close} onClick={() => deleteToast()}>
        <Image src={closeIcon} layout="fill" alt="closeToast" priority={true} />
      </div>
      <div className={styles.loadBar}></div>
    </div>
  )
}

export default Toast