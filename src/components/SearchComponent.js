import React, {useEffect, useState} from "react";
import {BookItemComponent} from "./BookItemComponent";
import * as uuid from "uuid";
import {getAll, search} from "../BooksAPI";
import {constants} from "../constants";
import {Link} from "react-router-dom";

export const SearchComponent = ({
    listBook,
    handleMoveOn
}) => {
    const [listSearchItem, setListSearchItem] = useState(listBook);
    const [searchText, setSearchText] = useState("");

    const render = (listSearchItem) => {
        if (listSearchItem && listSearchItem.length > 0) {
            return listSearchItem.map(e => (
                <li key={uuid.v4()}>
                    <BookItemComponent
                        item={e}
                        handleMoveOn={handleMoveOn}
                        type={checkType(e.shelf)}/>
                </li>
            ))
        }
    }

    const checkType = (shelf) => {
        console.log("shelf", shelf);
        if (constants.BOOKSHELF_CURRENT_VALUE === shelf) {
            return constants.BOOKSHELF_CURRENT_VALUE
        } else if (constants.BOOKSHELF_WTR_VALUE === shelf) {
            return constants.BOOKSHELF_WTR_VALUE;
        } else if (constants.BOOKSHELF_READ_VALUE === shelf) {
            return constants.BOOKSHELF_READ_VALUE;
        }
    }

    const handleQuerySearch = (searchText) => {
        if (searchText) {
            search(searchText)
            .then(data => {
                console.log(data);
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
            setListSearchItem(listBook);
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
