/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React from 'react';
import { useQuery } from 'react-query';
import BookService from '../services/BookService';

type BookViewModel = {
    id: string;
    title: string;
};

function BookTable() {
    console.log('Rerender');

    const { status, data, error } = useQuery<BookViewModel[], Error>(
        ['bookList'],
        BookService.getAll
    );

    if (status === 'loading') {
        return <Loader />;
    }

    if (status === 'error') {
        showNotification({
            title: 'Error',
            message: error.message,
        });
    }

    if (status === 'success') {
        showNotification({
            title: 'default',
            message: 'Hey there, your code is awesome! 🤥',
        });
    }

    const books = data ? (
        data.map((book: BookViewModel) => {
            if (book === undefined) {
                return <div>Loading...</div>;
            } else {
                return (
                    <li key={book.id}>
                        <Text>{book.title}</Text>
                    </li>
                );
            }
        })
    ) : (
        <div>No books found</div>
    );

    const bookList = <ul>{books}</ul> || <div>No books found</div>;

    return <div>{bookList}</div>;
}

export default BookTable;
