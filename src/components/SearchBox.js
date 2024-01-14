import SearchBoxItem from "./SearchBoxItem";

const SearchBox = ({list, useRef}) => {
    return (
        <div ref={useRef} className="searchbox__wrapper">
            <span className="searchbox__title">
                List Product
            </span>
            <div className="searchbox__list">
                {list.map((item, index) => (
                    <SearchBoxItem key={index} data={item} />
                ))}
            </div>
        </div>
    )
}

export default SearchBox;
