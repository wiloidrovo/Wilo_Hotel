import { connect } from "react-redux";
import Layout from "hocs/layouts/Layout";
import Navbar from "components/navigation/Navbar";
import Footer from "components/navigation/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { get_room } from "redux/actions/room/room";
import { StarIcon } from '@heroicons/react/20/solid'
import DOMPurify from 'dompurify'


function RoomDetail({
    get_room,
    room
}) {
    const params = useParams();
    const slug = params.slug;

    useEffect(() => {
        get_room(slug);
    }, [get_room, slug]);

    const reviews = { href: '#', average: 4, totalCount: 117 };

    const product = {
        href: '#',
        images: [
            {
                src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
                alt: '',
            },
        ],
        highlights: [
            'Hand cut and sewn locally',
            'Dyed with our proprietary colors',
        ],
    };

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    if (!room) {
        return (
            <Layout>
                <Navbar />
                <div className="pt-28">
                    <div className="bg-white">
                        <p>Loading...</p>
                    </div>
                </div>
                <Footer />
            </Layout>
        );
    }

    return (
        <Layout>
            <Navbar />
            <div className="pt-28">
                <div className="bg-white">
                <div className="bg-white">
      <div className="pt-6">

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={product.images[0].src}
              alt={product.images[0].alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={product.images[0].src}
                alt={product.images[0].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={product.images[0].src}
                alt={product.images[0].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={room.Thumbnail}
              alt={"pipipi"}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{room.RoomName}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">${room.RoomPrice}</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <form className="mt-10">

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Reserve Now!
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{room.Description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              {/*<h2 className="text-sm font-medium text-gray-900">Content</h2>*/}

              <div className="mt-4 space-y-6">
                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(room.Content)}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
                </div>
            </div>
            <Footer />
        </Layout>
    );
}

const mapStateToProps = state => ({
    room: state.room.room
});

export default connect(mapStateToProps, { get_room })(RoomDetail);
