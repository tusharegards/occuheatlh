import BecomeAClient from "../Layouts/BecomeAClient"
import Carousel from "../Layouts/Carousel"
import OurServices from "../Layouts/OurServices"
import WhyChooseOccuHealth from "../Layouts/WhyChooseOccuHealth"


function Home() {
  return (
    <div>
      <Carousel/>
      <OurServices/>
      <WhyChooseOccuHealth/>
      <BecomeAClient/>
    </div>
  )
}

export default Home
