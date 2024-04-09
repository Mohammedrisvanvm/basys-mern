import { useEffect, useState } from "react"
import { axiosBase } from "../api/axios"

const HomePage = () => {
  useEffect(()=>{
    axiosBase.get('/entity/get').then((res)=>{
      console.log(res);
      
    })
  })
  return (
    <>

  
    </>
  )
}

export default HomePage
