import React, {useState} from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {SearchComponent} from "./components/SearchComponent";
import {constants} from "./constants";
import {listCurrentlyRead, listRead, listWantToRead} from "./data";
import {BookListComponent} from "./components/BookListComponent";
import {Routes} from "react-router";
import {BrowserRouter, Route} from "react-router-dom";

export const App = () => {

    const [listBookCurrent, setListBookCurrent] = useState(listCurrentlyRead);
    const [listBookWTR, setListBookWTR] = useState(listWantToRead);
    const [listBookRead, setListBookRead] = useState(listRead);

    const handleCurrentReading = (item) => {
        if (item) {
            if (listBookCurrent.filter(e => e.id === item.id)) {
                listBookCurrent.push(item);
                setListBookCurrent(listBookCurrent);
            }
        }
    }

    const handleWantToRead = (item) => {
        if (item) {
            if (listBookWTR.filter(e => e.id === item.id)) {
                listBookWTR.push(item);
                setListBookWTR(listBookWTR);
            }
        }
    }

    const handleRead = (item) => {
        if (item) {
            if (listBookRead.filter(e => e.id === item.id)) {
                listBookRead.push(item);
                setListBookRead(listBookRead);
            }
        }
    }

    const handleMoveOn = (item, oldType, newType) => {
        if (constants.BOOKSHELF_CURRENT_VALUE === oldType) {
            const temp = listBookCurrent.filter(e => e.id !== item.id);
            setListBookCurrent(temp);
        } else if (constants.BOOKSHELF_WTR_VALUE === oldType) {
            const temp = listBookWTR.filter(e => e.id !== item.id);
            setListBookWTR(temp);
        } else if (constants.BOOKSHELF_READ_VALUE === oldType) {
            const temp = listBookRead.filter(e => e.id !== item.id);
            setListBookRead(temp);
        }

        if (constants.BOOKSHELF_CURRENT_VALUE === newType) {
            listBookCurrent.push(item);
            setListBookCurrent(listBookCurrent);
        } else if (constants.BOOKSHELF_WTR_VALUE === newType) {
            listBookWTR.push(item);
            setListBookWTR(listBookWTR);
        } else if (constants.BOOKSHELF_READ_VALUE === newType) {
            listBookRead.push(item);
            setListBookRead(listBookRead);
        }
    }

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path={"*"}
                           element={<BookListComponent
                               listCurrentlyRead={listBookCurrent}
                               listWTR={listBookWTR}
                               listRead={listBookRead}
                               handleCurrentReading={handleCurrentReading}
                               handleWantToRead={handleWantToRead}
                               handleRead={handleRead}
                               handleMoveOn={handleMoveOn}
                           />}/>
                    <Route path={"/search"}
                           element={<SearchComponent
                               listCurrentlyRead={listBookCurrent}
                               listWTR={listBookWTR}
                               listRead={listBookRead}
                               handleCurrentReading={handleCurrentReading}
                               handleWantToRead={handleWantToRead}
                               handleRead={handleRead}
                               handleMoveOn={handleMoveOn}
                           />}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
