import React from 'react'
import { Audio,InfinitySpin,Triangle } from 'react-loader-spinner'
const Loading = () => {
  return (
    <div className='w-full bg-black h-screen flex justify-center items-center'>
      {/* <Audio
           hieght="100"
           width="100"
           color='blue'
           arialabel='Chargement'
        /> */}
     <Triangle
  height="120"
  width="120"
  color="blue"
  ariaLabel="triangle-loading"
  wrapperStyle={{}}
  wrapperClassName=""
  visible={true}
/>
    </div>
  )
}

export default Loading