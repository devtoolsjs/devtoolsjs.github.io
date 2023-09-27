import { useEffect, useState } from 'react'

export default function useWindowSize() {
  const [size, setSize] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight
  }))

  useEffect(() => {
    const onSizeChange = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener('resize', onSizeChange, true)
    return () => {
      window.removeEventListener('resize', onSizeChange, true)
    }
  }, [])

  return size
}
