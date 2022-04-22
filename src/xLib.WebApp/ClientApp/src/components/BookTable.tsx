/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useQuery } from 'react-query';
import * as api from '../api/bookApi';

function BookTable() {
    const { data } = useQuery([], api.getBooks);
    const books = data ? (
        data.map((book: any) => {
            if (book === undefined) {
                return <div>Loading...</div>;
            } else {
                return <li key={book.id}>{book.title}</li>;
            }
        })
    ) : (
        <div>No books found</div>
    );

    const bookList = <ul>{books}</ul> || <div>No books found</div>;

    return <div>{bookList}</div>;
}

export default BookTable;
