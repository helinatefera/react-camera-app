import React ,{useState,useEffect,useRef} from 'react'

const App = () => {
  const videoref=useRef(null)
  const photoref=useRef(null)
  const [hasPhoto,setHasphoto]=useState('')

  const getVideo=()=>{
    navigator.mediaDevices.getUserMedia({
      video:{width:1920,height:1000}

    })
    .then(stream=>{
      let video=videoref.current;
      video.srcObject=stream;
      video.play();
    })
    .catch(err=>{
      console.error(err);
    })
  }
  useEffect(()=>{
    getVideo();

  },[videoref])
  const takephoto=()=>{
    const w=100
    const h=100
    let video=videoref.current
    let photo=photoref.current
    photo.width=w
    photo.height=h
    let ctx=photo.getContext('2d')
    ctx.drawImage(video,0,0,w,h)
    setHasphoto(true)
  }
  const dele=()=>{
    
    let photo=photoref.current
    
    let ctx=photo.getContext('2d')
    ctx.clearRect(0,0,photo.width,photo.height)
    setHasphoto(false)
  }
  return (
    <div>
      <div>
      <video ref={videoref}></video>
      <button onClick={takephoto}> SNAP1</button>
    </div>
    <div className={'result'+(hasPhoto?'hasPhoto':'')}>
      <canvas ref={photoref}></canvas>
      <button onClick={dele}>CLOSE!</button>
    </div>
    </div>
  )
}

export default App