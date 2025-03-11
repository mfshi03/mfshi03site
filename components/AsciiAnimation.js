import { useEffect, useState } from 'react'

const AsciiAnimation = ({ frameRate = 100 }) => {
  const [frames, setFrames] = useState([])
  const [currentFrame, setCurrentFrame] = useState(0)

  useEffect(() => {
    fetch('/frames.json') // Load from /public/frames.json
      .then((res) => res.json())
      .then((data) => setFrames(data))
      .catch((err) => console.error('Error loading frames:', err))
  }, [])

  useEffect(() => {
    if (frames.length === 0) return

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length)
    }, frameRate)

    return () => clearInterval(interval) // Cleanup interval on unmount
  }, [frames, frameRate])

  return (
    <div
      dangerouslySetInnerHTML={{ __html: frames[currentFrame] || 'Loading...' }}
      style={{
        fontFamily: 'monospace',
        whiteSpace: 'pre',
        textAlign: 'center',
        color: 'white',
      }}
    />
  )
}

export default AsciiAnimation
