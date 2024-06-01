import {Link} from 'react-router-dom'

export default function CTA() {
    return (
      <div className="bg-gray-50">
        <div className="mx-auto lg:mx-12 max-w-full py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-orange-600">Make your first reservation.</span>
          </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                <Link
                    to="/reservations"
                    type="button"
                    className="ml-12 relative inline-flex items-center rounded-md border border-transparent bg-orange-600 px-6 py-2 text-md font-bold text-white shadow-sm transition duration-300 ease-in-out hover:bg-black focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                    Book Now!
                </Link>
                <Link
                    to="/reservations"
                    type="button"
                    className="ml-12 relative inline-flex items-center rounded-md border border-transparent bg-white px-6 py-2 text-md font-medium text-orange shadow-sm transition duration-300 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                    Read More
                </Link>
          </div>
        </div>
      </div>
    )
  }