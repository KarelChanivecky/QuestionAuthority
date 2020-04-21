import React from "react";

export default function SearchBar(props) {
    const handleSearchClick = e => {
        // props.useSearchResults();
    };

    return <>
        <div className='row justify-content-center search-bar'>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <button className="btn btn-outline-secondary" type="button" onClick={handleSearchClick}>
                        <img id='searchBarIcon' alt='Search groups' title='Search groups' src={require('../img/loupe.svg')} />
                    </button>
                </div>
                <input type="text" className="form-control" placeholder="" />
            </div>
        </div>
    </>
}