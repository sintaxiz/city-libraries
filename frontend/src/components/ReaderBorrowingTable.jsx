import React from "react";
import {DataTable, Text} from "grommet";

export default function ReaderBorrowingTable(props){
    console.log(props.borrowings)
    return(
        <DataTable
            border={true}
            fill="horizontal"
            columns={[
                {
                    property: 'readerName',
                    header: <Text>Reader</Text>
                },
                {
                    property: 'publicationName',
                    header: <Text>Publication</Text>
                },
                {
                    property: 'borrowingDate',
                    header: <Text>Borrowing</Text>
                },
                {
                    property: 'returnDate',
                    header: <Text>Return</Text>
                },
            ]}
            data={props.borrowings}
        />)
}