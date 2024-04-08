import { useState } from "react"
import ProviderData from "./provider/ProviderData"
import VerificationData from "./provider/VerificationData"

const HomePage = () => {
  const [homePage,setHomePage]=useState<string>('ProviderData')
  return (
    <>
    {homePage==='VerificationData' ? <VerificationData setHomePage={setHomePage}/> :null}
    {homePage==='ProviderData' ? <ProviderData setHomePage={setHomePage}/> :null}
  
    </>
  )
}

export default HomePage
