import {DataTable, Text} from "grommet";
import * as React from "react";

export default function BorrowingsTable(props) {
    console.log(props.publications)
    return(
    <DataTable
        border={true}
        fill="horizontal"
        columns={[
            {
                property: 'roomId',
                header: <Text>Room</Text>
            },
            {
                property: 'bookshelfId',
                header: <Text>Bookshelf</Text>
            },
            {
                property: 'reader',
                header: <Text>Reader</Text>
            },
            {
                property: 'publicationName',
                header: <Text>Publication</Text>
            },
            {
                property: 'year',
                header: <Text>Year</Text>,
                size: "small"
            },
            {
                property: 'author',
                header: <Text>Author</Text>
            },
            {
                property: 'borrowingDate',
                header: <Text>Borrowing</Text>
            }
        ]}
        data={props.publications}
    />)
}