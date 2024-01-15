import { Link } from "react-router-dom";

const SearchBoxItem = ({data}) => {
    return (
        <Link to={`/product/${data._id}`} className="SearchItem">
            <img className="SearchItem__img" src={data.images[0]} />
            <div className="SearchItem__des">
                <span className="SearchItem__name">{data.name}</span>
                <span className="SearchItem__price">{data.price}$</span>
            </div>
        </Link>
    )
}

export default SearchBoxItem;