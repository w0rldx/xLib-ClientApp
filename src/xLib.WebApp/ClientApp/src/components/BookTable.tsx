import React from 'react';
import { useQuery } from 'react-query';
import BookService from '../services/BookService';

type BookViewModel = {
    id: string;
    title: string;
};

function BookTable() {
    const { status, data, error } = useQuery<BookViewModel[], Error>(
        ['bookList'],
        BookService.getAll
    );

    if (status === 'loading') {
        return <span>Loading...</span>;
    }

    if (status === 'error') {
        return <span>Error: {error.message}</span>;
    }

    const books = data ? (
        data.map((book: BookViewModel) => {
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
