import CTA from "components/Home/CTA"
import Header from "components/Home/Header"
import Incentives from "components/Home/Incentives"
import Reviews from "components/Home/Reviews"
import Footer from "components/navigation/Footer"
import Navbar from "components/navigation/Navbar"
import Layout from "hocs/layouts/Layout"
import { useEffect } from "react"

function Home(){
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return(
        <Layout>
            <Navbar/>
            <div className="pt-28">
                <Header/>
                <Incentives/>
                <Reviews/>
                <CTA/>
            </div>
                <Footer/>
        </Layout>
    )
}
export default Home