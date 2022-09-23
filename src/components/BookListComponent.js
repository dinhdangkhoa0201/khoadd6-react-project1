import React from "react";
import {BookShelfComponent} from "./BookShelfComponent";
import * as uuid from "uuid";
import {constants} from "../constants";
import {Link} from "react-router-dom";

export const BookListComponent = ({
    listCurrentlyRead,
    listWTR,
    listRead,
    handleCurrentReading,
    handleWantToRead,
    handleRead,
    handleMoveOn
}) => {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <BookShelfComponent
                        key={uuid.v4()}
                        bookShelfTitle={constants.BOOKSHELF_CURRENT_TITLE}
                        listItem={listCurrentlyRead}
                        handleCurrentReading={handleCurrentReading}
                        handleWantToRead={handleWantToRead}
                        handleRead={handleRead}
                        type={constants.BOOKSHELF_CURRENT_VALUE}
                        handleMoveOn={handleMoveOn}/>

                    <BookShelfComponent
                        key={uuid.v4()}
                        bookShelfTitle={constants.BOOKSHELF_WTR_TITLE}
                        listItem={listWTR}
                        handleCurrentReading={handleCurrentReading}
                        handleWantToRead={handleWantToRead}
                        handleRead={handleRead}
                        type={constants.BOOKSHELF_WTR_VALUE}
                        handleMoveOn={handleMoveOn}/>

                    <BookShelfComponent
                        key={uuid.v4()}
                        bookShelfTitle={constants.BOOKSHELF_READ_TITLE}
                        listItem={listRead}
                        handleCurrentReading={handleCurrentReading}
                        handleWantToRead={handleWantToRead}
                        handleRead={handleRead}
                        type={constants.BOOKSHELF_READ_VALUE}
                        handleMoveOn={handleMoveOn}/>
                </div>
                <div className="open-search">
                    <Link to={"/search"}>
                        <button>
                            Add a book
                        </button>
                    </Link>
                </div>
            </div>
        </div>

    )
}
