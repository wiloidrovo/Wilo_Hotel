import Header from "components/Reservations/Header"
import Footer from "components/navigation/Footer"
import Navbar from "components/navigation/Navbar"
import Layout from "hocs/layouts/Layout"
import { useEffect } from "react"
import { Helmet } from "react-helmet-async";
import { get_categories } from "redux/actions/categories/categories";
import { connect } from "react-redux";
import { get_room_list, get_room_list_page, search_room } from "redux/actions/room/room"
import CategoriesHeader from "components/room/CategoriesHeader"
import RoomsList from "components/Reservations/RoomsList"
import { useParams } from "react-router-dom"

function Search({
    rooms,
    count,
    next,
    previous,
    search_room
}){
    const params = useParams()
    const term = params.term

    useEffect(()=>{
        window.scrollTo(0,0)
        search_room(term)
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
                SEARCH ROOMS
            </div>
                <Footer/>
        </Layout>
    )
}
const mapStateToProps = state =>({
    rooms: state.room.filtered_rooms,
    count: state.room.count,
    next: state.room.next,
    previous: state.room.previous,
})

export default connect(mapStateToProps,{
    search_room
}) (Search)