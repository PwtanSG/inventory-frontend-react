import { FaTimes } from 'react-icons/fa'

const SearchBar = ({ keyword, setKeyword, onClear }) => {

    const styling = { width: "15rem", background: "#F2F1F9", border: "none", padding: "0px", borderRadius: '5px' };
    const barStyling = { width: "12rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };
    const iconStyling = { backgroundColor: "#F2F1F9", border: "none", padding: "0.5rem", color: 'grey' };

    return (
        <>
            <div style={styling}>
                <input
                    className='no-outline'
                    style={barStyling}
                    key="0123"
                    value={keyword}
                    placeholder={"search..."}
                    onChange={(e) => setKeyword(e.target.value)}
                // onChange={setKeyword}
                />
                <span style={iconStyling}>
                    <FaTimes onClick={() => onClear()} />
                </span>
            </div>
        </>
    );
}

export default SearchBar