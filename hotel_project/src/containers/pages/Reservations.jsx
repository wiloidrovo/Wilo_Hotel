import Header from "components/Reservations/Header"
import RoomsList from "components/Reservations/RoomsList"
import Footer from "components/navigation/Footer"
import Navbar from "components/navigation/Navbar"
import Layout from "hocs/layouts/Layout"
import { useEffect } from "react"
import { Helmet } from "react-helmet-async"

function Reservations(){
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return(
        <Layout>
            <Helmet>
            <title>WILO'S HOTEL | Reservations</title>
            <meta name="canonical" content="Luxury hotel accessible to everyone. Come and Feel Free."/>
            <meta name="keywords" content='hotel, full services, comfort, luxury'/>
            <meta name="robots" content='all'/>
            <link rel="canonical" href="https://www.wilo.com" />
            <meta name="author" content='Wilo'/>
            <meta name="publisher" content='Wilo'/>

            {/* Social Media Tags */}
            <meta property="og:title" content='WILOS HOTEL' />
            <meta property="og:description" content='Luxury hotel accessible to everyone. Come and Feel Free..' />
            <meta property="og:url" content="https://www.wilo.com/" />
            <meta property="og:image" content='' />

            <meta name="twitter:title" content='WILOS HOTEL' />
            <meta
                name="twitter:description"
                content='Luxury hotel accessible to everyone..'
            />
          </Helmet>
            <Navbar/>
            <div className="pt-28">
                <Header/>
                <RoomsList/>
            </div>
                <Footer/>
        </Layout>
    )
}
export default Reservations