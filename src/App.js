import React, {useEffect, useState} from 'react'
import './App.css'
import {SearchComponent} from "./components/SearchComponent";
import {BookListComponent} from "./components/BookListComponent";
import {Routes} from "react-router";
import {BrowserRouter, Route} from "react-router-dom";
import {getAll, update} from "./BooksAPI";

export const App = () => {

    const [listBook, setListBook] = useState([]);

    useEffect(() => {
        handleGetAll();
    }, [])

    const handleGetAll = () => {
        getAll()
        .then(data => {
            setListBook(data);
        })
        .catch(err => {
            console.error(err);
        })
    }

    const handleMoveOn = (book, shelf) => {
        update(book, shelf).then(data => {
            handleGetAll();
        }).catch(err => {
            console.error(err);
        })
    }

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path={"*"}
                           element={<BookListComponent
                               listBook={listBook}
                               handleMoveOn={handleMoveOn}
                           />}/>
                    <Route path={"/search"}
                           element={<SearchComponent
                               listBook={listBook}
                               handleMoveOn={handleMoveOn}
                           />}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
