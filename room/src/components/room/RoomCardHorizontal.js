import { Link } from "react-router-dom"

function RoomCardHorizontal({data, index}){

    return(
        <li 
        key={index}>
            <Link to='/'
                onMouseEnter={()=>{
                    const img = document.getElementById(index)
                    img.classList.add('object-scale-down')
                }}
                onMouseLeave={()=>{
                    const img = document.getElementById(index)
                    img.classList.remove('object-scale-down')
                }}
            className="block hover:shadow-2xl rounded-lg transition duration-300 ease-in-out">
              <div className="flex items-center my-10 ">
                <div className="flex min-w-0 flex-1 items-center">
                  <div className="flex-shrink-0">
                    <img id={index} className="h-50 w-80 object-cover rounded-lg" src={`https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`} alt="" />
                  </div>
                  <div className="min-w-0 flex-1 px-4">
                    <p className="text-xl font-bold">{data.name}</p>
                    <p>{data.category.name}</p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
    )
}
export default RoomCardHorizontal