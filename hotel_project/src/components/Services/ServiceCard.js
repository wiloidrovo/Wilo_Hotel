function ServiceCard({data}){
    return(
        <div className="w-full relative p-8 h-96 lg:h-[200pm] bg-white hover:-translate-y-1 transition duration-300 ease-in-out">
            <div className="w-full">
                <img src={data.img} alt="" className='w-9 h-9' />
                <h2 className="text-xl font-semibold text-gray-900 pt-5">{data.title}</h2>
                <p className="text-lg font-regular text-gray-500 pt-3">{data.title}</p>
                <p className="text-lg font-regular text-gray-500 pt-3">{data.title}</p>
            </div>
            <div className="absolute bottom-0 left-0">
                <h2 className="items-end text-xl font-semibold text-gray-900 pt-5">Read More</h2>
            </div>
        </div>
    )
}
export default ServiceCard