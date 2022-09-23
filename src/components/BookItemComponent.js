import React from "react";
import {SelectComponent} from "./SelectComponent";

// BookItemComponent.propTypes = {
//     backgroundImage: PropTypes.string.isRequired,
//     bookTitle: PropTypes.string.isRequired,
//     bookAuthor: PropTypes.string.isRequired
// }

export const BookItemComponent = ({
    item,
    handleCurrentReading,
    handleWantToRead,
    handleRead,
    handleMoveOn,
    type
}) => {

    const thumbnail = (item.imageLinks) ? item.imageLinks.smallThumbnail : "";

    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${thumbnail})`
                    }}/>
                <SelectComponent item={item}
                                 handleCurrentReading={handleCurrentReading}
                                 handleWantToRead={handleWantToRead}
                                 handleRead={handleRead}
                                 handleMoveOn={handleMoveOn}
                                 type={type}/>
            </div>
            <div className="book-title">{item.title}</div>
            <div className="book-authors">{item.authors}</div>
        </div>
    )
}
