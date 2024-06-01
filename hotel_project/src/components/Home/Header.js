import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import freewifi from 'assets/img/freewifi.png';
import furnished from 'assets/img/furnished.png';
import parking from 'assets/img/parking.png';
import cleaning from 'assets/img/cleaning.png';
import room2 from 'assets/img/room2.png'

function Header(){
    return(
        <main>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-4xl pt-20 pb-32 sm:pt-40 sm:pb-40">
            <div>
              <div className="relative z-10 p-8 bg-white bg-opacity-80 rounded-lg shadow-lg w-[105%] mx-30 mt-12">
                <h1 className="text-4xl font-semibold tracking-tight sm:text-center sm:text-7xl">
                  
                    <Typewriter
                        words={['WILO\'S HOTEL', 'Your comfort is our priority']}
                        loop={0}
                        cursor
                        cursorStyle='_'
                        typeSpeed={50}
                        deleteSpeed={50}
                        delaySpeed={1200}
                        //onLoopDone={handleDone}
                        //onType={handleType}
                    />
                </h1>
                <ul className='flex gap-8 justify-center py-8'>
                    <li className='inline-flex hover:underline hover:underline-orange-500 hover:underline-offset-4'>
                        <Link to='/services' className="mt-6 text-lg font-medium leading-8 text-gray-700 sm:text-center sm:img-center">
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img
                                src={freewifi}
                                width={39}
                                height={30}
                                alt="Free WiFi"
                            />
                            <p style={{ margin: 0 }}>Free Wifi</p>
                        </div>
                        </Link>
                    </li>
                    <li className='inline-flex hover:underline hover:underline-orange-500 hover:underline-offset-4'>
                        <Link to='/services' className="mt-6 text-lg font-medium leading-8 text-gray-700 sm:text-center">
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img
                                src={furnished}
                                width={21.8}
                                height={30}
                                alt="Fully Furnished"
                            />
                            <p style={{ margin: 0 }}>Fully Furnished</p>
                        </div>
                            
                        </Link>
                    </li>
                    <li className='inline-flex hover:underline hover:underline-orange-500 hover:underline-offset-4'>
                    <Link to='/services' className="mt-6 text-lg font-medium leading-8 text-gray-700 sm:text-center">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img
                                src={parking}
                                width={29}
                                height={30}
                                alt="Free Parking"
                            />
                            <p style={{ margin: 0 }}>Free Parking</p>
                        </div>
                        </Link>
                    </li>
                    <li className='inline-flex hover:underline hover:underline-orange-500 hover:underline-offset-4'>
                    <Link to='/services' className="mt-6 text-lg font-medium leading-8 text-gray-700 sm:text-center">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img
                                src={cleaning}
                                width={29}
                                height={30}
                                alt="Cleaning Services"
                            />
                            <p style={{ margin: 0 }}>Cleaning Services</p>
                        </div>
                    </Link>
                    </li>
                </ul>
              </div>
              <div className="absolute inset-x-0 top-[calc(100%-31rem)] -z-10 transform-gpu overflow-hidden lg:top-[calc(100%-42.5rem)] sm:top-[calc(100%-40.5rem)]">
                <img
                    src={room2}
                    width={1500}
                    height={1500}
                    alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    )
}
export default Header