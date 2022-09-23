import React from "react";
import {BookItemComponent} from "./BookItemComponent";
import * as uuid from "uuid";

export const BookShelfComponent = ({
    bookShelfTitle,
    listItem,
    handleCurrentReading,
    handleWantToRead,
    handlerRead,
    handleMoveOn,
    type
}) => {

    const readerListItem = () => {
        return listItem.map(e => (
            <li key={uuid.v4()}>
                <BookItemComponent
                    item={e}
                    handleCurrentReading={handleCurrentReading}
                    handleWantToRead={handleWantToRead}
                    handlerRead={handlerRead}
                    handleMoveOn={handleMoveOn}
                    type={type}/>
            </li>
        ))
    }

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{bookShelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {readerListItem()}
                </ol>
            </div>
        </div>
    )
}
