import { Link } from "react-router-dom"

function RoomCard({data, index}){

  const statusColor = data.Status === 'Available' ? 'text-green-600' : 'text-red-600';
    
  return(
        <div
        onMouseEnter={()=>{
            const img = document.getElementById(index)
            img.classList.add('object-scale-down')
            const title = document.getElementById(data.RoomID)
            title.classList.add('text-orange-500')
        }}
        onMouseLeave={()=>{
            const img = document.getElementById(index)
            img.classList.remove('object-scale-down')
            const title = document.getElementById(data.RoomID)
            title.classList.remove('text-orange-500')
        }}
        
        className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                <div className="flex-shrink-0">
                  <img id={index} className="h-96 w-full object-cover" src={data.Thumbnail} alt={data.RoomName} />
                </div>
                <div className="flex flex-1 flex-col justify-between bg-white p-6">
                  <div className="flex-1">
                  <Link to={`/category/${data.category.slug}`}>
                      <p id={data.RoomID} className="lg:text-3xl text-2xl font-semibold transition duration-400 ease-in-out text-gray-900">
                        {data.RoomName}
                      </p>
                    </Link>
                    <p className="text-sm font-medium text-black hover:underline">
                      <Link to={`/category/${data.category.slug}`}>{data.category.name}</Link>
                    </p>
                      <p className="mt-3 text-xl text-gray-700">{data.Description}</p>
                      <p className="mt-3 text-xl text-gray-700">Price: ${data.RoomPrice}</p>
                      <p className={`mt-3 text-md ${statusColor}`}>{data.Status}</p>
                  </div>
                </div>
              </div>
    )
}
export default RoomCard