import RoomCard from "./RoomCard"
import Carousel from 'next-elastic-carousel'
import cuarto1 from 'assets/img/cuarto1.png'
import cuarto2 from 'assets/img/cuarto2.png'
import cuarto3 from 'assets/img/cuarto3.png'
import cuarto4 from 'assets/img/cuarto4.png'

function RoomsList({rooms}){
    {/*const rooms = [
        {
            id:'1234-qwer',
            title: 'Room 1',
            href: '#',
            category: { name: 'Article', href: '#' },
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.',
            date: 'Mar 16, 2020',
            datetime: '2020-03-16',
            imageUrl: cuarto1,
            readingTime: '6 min',
        },
        {
            id:'1234-asdf',
            title: 'Room 2',
            href: '#',
            category: { name: 'Video', href: '#' },
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.',
            date: 'Mar 10, 2020',
            datetime: '2020-03-10',
            imageUrl: cuarto2,
            readingTime: '4 min',
        },
        {
            id:'4321-zxcv',
            title: 'Room 3',
            href: '#',
            category: { name: 'Case Study', href: '#' },
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.',
            date: 'Feb 12, 2020',
            datetime: '2020-02-12',
            imageUrl: cuarto3,
            readingTime: '11 min',
        },
        {
            id:'4321-tyui',
            title: 'Room 4',
            href: '#',
            category: { name: 'Case Study', href: '#' },
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.',
            date: 'Feb 12, 2020',
            datetime: '2020-02-12',
            imageUrl: cuarto4,
            readingTime: '11 min',
        },
      ]*/}

      const breakPoints = [
        {width: 1, itemsToShow: 1, itemsToScroll: 1},
        {width: 700, itemsToShow: 2, itemsToScroll: 2},
        {width: 1000, itemsToShow: 3, itemsToScroll: 3},
      ]

    return(
        <div className="relative px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="absolute inset-0">
          <div className="h-1/3 bg-white sm:h-2/3" />
        </div>
        <div className="relative mx-auto max-w-7xl">
            <Carousel
                breakPoints={breakPoints}
                pagination={false}
                itemPadding={[0,5]}
            >        
                {rooms&&rooms.map((room, index) => (
                    <RoomCard key={index} data={room} index={index}/>
                ))}
            </Carousel>
        </div>
      </div>
    )
}
export default RoomsList