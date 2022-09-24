import React, {useState} from "react";
import {BookItemComponent} from "./BookItemComponent";
import * as uuid from "uuid";
import {search} from "../BooksAPI";
import {Link} from "react-router-dom";
import {DebounceInput} from "react-debounce-input";

export const SearchComponent = ({
    listBook,
    handleMoveOn
}) => {
    const [listSearchItem, setListSearchItem] = useState([]);

    const render = (listSearchItem) => {
        if (listSearchItem && listSearchItem.length > 0) {
            return listSearchItem.map(e => (
                <li key={uuid.v4()}>
                    <BookItemComponent
                        item={e}
                        handleMoveOn={handleMoveOn}
                        type={e.shelf}
                    />
                </li>
            ))
        }
    }

    const handleQuerySearch = (searchText) => {
        if (searchText) {
            search(searchText)
            .then(data => {
                const temp = data.map((e) => {
                    const bookOnShelf = listBook.find((b) => b.id === e.id);
                    e.shelf = bookOnShelf ? bookOnShelf.shelf : 'none';
                    return e;
                })
                setListSearchItem(temp);
            })
            .catch(err => {
                setListSearchItem([]);
            })
        }
    }

    const handleSearchText = (event) => {
        const value = event.target.value;

        if (!value) {
            setListSearchItem([]);
        } else {
            handleQuerySearch(value);
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
                    <DebounceInput
                        minLength={2}
                        debounceTimeout={325}
                        element={"input"}
                        type={"text"}
                        placeholder="Search by title or author"
                        onChange={handleSearchText}
                    />

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
