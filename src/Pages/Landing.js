import TokenAccountSignUp from "./TokenAccountSignUp";
import { useSearchParams } from "react-router-dom"
import LoginPage from './Login.js'
import './backgroundStyle.css'
import p1 from "../images/1.jpeg"
import p2 from "../images/afghanis.jpg"
import p3 from "../images/3.jpeg"
import p4 from "../images/4.jpeg"
import p5 from "../images/5.jpeg"
import p6 from "../images/6.jpeg"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';


function Landing(props) {
  const [params, setParams] = useSearchParams();
  const tokenParam = params.get("token")
  {/* these handle opening aid pages in a new tab when they are clicked on */}    
const handleMSFClick = () => {
  window.open('https://www.doctorswithoutborders.org/')
  }
const handleGGClick = () => {
  window.open('https://www.globalgiving.org')
  }
const handleIRClick = () => {
  window.open('https://irusa.org')
  }
const handleWFWClick = () => {
  window.open('https://womenforwomen.org.uk')
  }


  if (tokenParam) {
    return <TokenAccountSignUp tokenParam={tokenParam} handleTokenLogin={props.handleTokenLogin} />
  }
  return(
<div id='container' >
  <div className='moving' >
    <div className='moving-bg' >
    </div>
  </div>
    {/* here is all of the cards  */}
  <div id='cards' >
  
    <div id='top'>
    <div id='login-box'>
      <LoginPage handleStandardLogin={props.handleStandardLogin}/>
    </div>
</div>
    <div id='bottom_carousel'> 
    <div className='carousel aid'>
       <Carousel infiniteLoop={true} autoPlay={true} dynamicHeight={false} showThumbs={false}  >
    
         <div onClick={handleMSFClick} >
             <img src='https://www.doctorswithoutborders.org/themes/custom/msf/logo.svg' />
         </div>

        <div  onClick={handleGGClick} className='aid-pictures' style={{height: '300px', transform: 'scaleY(0.8)' }}>
            <img src="https://logos-download.com/wp-content/uploads/2019/07/GlobalGiving_Logo-700x560.png"/>
        </div>

        <div onClick={handleIRClick}>
            <img src='https://irusa.org/wp-content/uploads/2020/01/ir-usa-logo-4.svg'/>
        </div>

    <div onClick={handleWFWClick}>
        <img src= "https://womenforwomen.org.uk/sites/default/files/no-png_logo_3.gif"/>
         </div>

        </Carousel>
     </div>
     <div id='facts-carousel' className='carousel' >
       <Carousel className='picture-text ' infiniteLoop={true} autoPlay={true} dynamicHeight={false} showThumbs={false}>
         <div >
           <img src={p1}/>
           <div className='right' ><strong> There are nearly 6 million Afghans who have been forcibly displaced from their homes.</strong></div>
         </div>
         <div >
           <img src={p2} />
           <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(0%, -50%)', height: '350px'}}><strong>Afghans have suffered more than 40 years of conflict, natural disasters, chronic poverty, food insecurity and most recently the COVID-19 pandemic.</strong> </div>
         </div>
         <div >
           <img src={p3}  />
           <div className='center-bottom2'><strong>Afghan refugees are the third-largest displaced population in the world ??? following Syrian refugees and displaced Venezuelans.</strong> </div>
         </div>
         <div >
           <img src={p4} />
           <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(0%, -70%)', height: '350px'}}><strong> The people of Afghanistan face increasing demand for shelter, food, water, non-food items, health services, livelihood opportunities and cash assistance.</strong></div>
         </div>
         <div >
           <img src={p5}  />
           <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(0%, -130%)', width: '350px'}}> <strong>80 percent of newly displaced Afghans are women and children.</strong></div>
         </div>
         <div >
           <img src={p6}  />
           <div className='center-bottom2'><strong>With so many families in need, please consider donating to the aid organization of your choice to help provide life, nourishment, and most importantly, hope to these families.</strong></div>
         </div>
       </Carousel>
     </div>
   </div>
  </div>


</div>

  )
} 
export default Landing;
