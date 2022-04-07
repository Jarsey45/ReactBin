import { useState, useEffect } from 'react';

const useTimer = () => {
  const [ms, setMs] = useState<number>(0);

  useEffect(() => {
    const timeout = setTimeout(()=>{
      setMs(ms + 100);
    },100)

    return () => clearTimeout(timeout);
  })

  return ms;
}

export default useTimer