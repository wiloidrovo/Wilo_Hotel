import RoomCardHorizontal from "./RoomCardHorizontal"

function RoomList({rooms}){

    return(
        <div className="overflow-hidden px-4 bg-white">
      <ul role="list" className="divide-y space-y-8 gap-8 divide-gray-100">
        {rooms&&rooms.map((room, index) => (
          <RoomCardHorizontal data={room} index={index}/>
        ))}
      </ul>
    </div>
    )
}
export default RoomList