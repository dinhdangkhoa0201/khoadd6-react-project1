import React, {useState} from "react";
import {BookItemComponent} from "./BookItemComponent";
import * as uuid from "uuid";
import {search} from "../BooksAPI";
import {constants} from "../constants";
import {Link} from "react-router-dom";

export const SearchComponent = ({
    listCurrentlyRead,
    listWTR,
    listRead,
    handleCurrentReading,
    handleWantToRead,
    handleRead,
    handleMoveOn
}) => {
    const [listSearchItem, setListSearchItem] = useState([]);
    const [searchText, setSearchText] = useState("");

    const render = (listSearchItem) => {
        if (listSearchItem && listSearchItem.length > 0) {
            return listSearchItem.map(e => (
                <li key={uuid.v4()}>
                    <BookItemComponent
                        item={e}
                        handleCurrentReading={handleCurrentReading}
                        handleWantToRead={handleWantToRead}
                        handleRead={handleRead}
                        handleMoveOn={handleMoveOn}
                        type={checkType(e.id)}/>
                </li>
            ))
        }
    }

    const checkType = (id) => {
        if (listCurrentlyRead && listCurrentlyRead.filter(e => e.id === id).length > 0) {
            return constants.BOOKSHELF_CURRENT_VALUE
        } else if (listWTR && listWTR.filter(e => e.id === id).length > 0) {
            return constants.BOOKSHELF_WTR_VALUE;
        } else if (listRead && listRead.filter(e => e.id === id).length > 0) {
            return constants.BOOKSHELF_READ_VALUE;
        }
    }

    const handleQuerySearch = (searchText) => {
        if (searchText) {
            search(searchText)
            .then(data => {
                setListSearchItem(data);
            })
            .catch(err => {
                setListSearchItem([]);
            })
        }
    }

    const handleSearchText = (event) => {
        const value = event.target.value;
        setSearchText(value);

        if (!value || value.trim().length === 0) {
            setListSearchItem([]);
        } else {
            handleQuerySearch(searchText);
        }
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to={"/"}>
                    <button className="close-search">
                        Close
                    </button>
                </Link>
                <div className="search-books-input-wrapper">
                    <input type="text"
                           value={searchText}
                           placeholder="Search by title or author"
                           onChange={(event) => handleSearchText(event)}/>

                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {render(listSearchItem)}
                </ol>
            </div>
        </div>
    )
}
