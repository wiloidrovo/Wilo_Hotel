import {useState} from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom"

function CategoriesHeader({categories}){

    const location = useLocation()
    const navigate = useNavigate()

    // SEARCH
    const [term, setTerm] = useState("");
    const handleChange = (e) => {
        setTerm(e.target.value);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        navigate("/s=" + term);
        setTerm("");
    };

    return(
        <div className="w-full bg-gray-100 py-8">
            <div className="grid grid-cols-12">
                <div className="col-span-10">
                    
                    <div className="space-x-8 px-12">
                        <div className="relative">
                            <div className="relative -mb-6 w-full overflow-x-auto pb-6">
                                <ul
                                    role="list"
                                    className="mx-4 inline-flex space-x-8 sm:mx-6"
                                >
                                    <Link to='/reservations'
                                    className={`${location.pathname === '/reservations' ? "text-orange-500 bg-white":"text-gray-900 border border-gray-100 hover:border-gray-200 hover:text-orange-500"} py-2 px-6 rounded-md font-regular`}>
                                        All
                                    </Link>
                                    {
                                        categories&&categories.map(category=>(
                                            <Link
                                            key={category.slug}
                                            to={`/category/${category.slug}`}
                                            className={`${location.pathname === `/category/${category.slug}` ? "text-orange-500 bg-white":"text-gray-900 border border-gray-100 hover:border-gray-200 hover:text-orange-500"} py-2 px-6 rounded-md font-regular`}>
                                                {category.name}
                                            </Link>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <form onSubmit={(e) => onSubmit(e)} className="relative col-span-2 mr-16">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <i className='bx bx-search-alt text-xl text-gray-800'></i>
                    </div>
                    <input
                        id='search'
                        name='search'
                        value={term}
                        onChange={(e) => handleChange(e)}
                        type='search'
                        className={`
                            py-2.5 pl-9 pr-3
                            block w-full py-2 rounded-full
                            border border-gray-200
                            focus:border-gray-200 focus:ring-gray-200
                            focus:outline-none focus:ring-1
                            placeholder-gray-600 focus:placeholder-gray-500
                        `}
                    />
                </form>
            </div>
        </div>
    )
}
export default CategoriesHeader