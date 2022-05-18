import * as React from "react";
import axios from "axios";
import {DataTable, Text} from "grommet";
import ReaderBorrowingInfo from "../components/ReaderBorrowingInfo";

export default function Borrowings(props) {
    const [borrowings, setBorrowings] = React.useState([])


    const loadBorrowings = () => {
        axios.get('http://localhost:8080/api/v1/borrowings')
            .then(res => {
                console.log(res.data)
                setBorrowings(res.data)
            })
    }

    React.useEffect(() => loadBorrowings(), [])

    return (
        <div>
            <h1>Borrowings</h1>

            <DataTable
                border={true}
                fill="horizontal"
                columns={[
                    {
                        property: 'id',
                        header: <Text>Id</Text>
                    },
                    {
                        property: 'readerId',
                        header: <Text>Reader</Text>
                    },
                    {
                        property: 'publicationId',
                        header: <Text>Publication</Text>
                    },
                    {
                        property: 'workerId',
                        header: <Text>Worker</Text>
                    },
                    {
                        property: 'libraryId',
                        header: <Text>Library</Text>
                    },
                    {
                        property: 'takeDate',
                        header: <Text>Take date</Text>
                    },
                    {
                        property: 'returnDate',
                        header: <Text>Return date</Text>
                    },
                    {
                        property: 'returnTerm',
                        header: <Text>Return term</Text>
                    }
                ]}
                data={borrowings}
            />
            <ReaderBorrowingInfo/>

        </div>
    )
}