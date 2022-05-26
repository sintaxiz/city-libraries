import React from "react";
import axios from "axios";
import {Box, DataTable, Text} from "grommet";
import BorrowingsTable from "../components/BorrowingsTable";
import ReaderBorrowingInfo from "../components/ReaderBorrowingInfo";
import ReaderBorrowingTable from "../components/ReaderBorrowingTable";
import BorrowingPeriod from "../components/BorrowingPeriod";

export default function Workers() {
    const [workers, setWorkers] = React.useState([])
    const [borrowings, setBorrowings] = React.useState([])
    const getAll = () => {
        axios.get('http://localhost:8080/api/v1/workers/all')
            .then(r => setWorkers(r.data))
    }
    React.useEffect(() => {
        getAll()
    }, []);

    function getReaders(worker) {
        axios.get('http://localhost:8080/api/v1/workers/' + worker + '/readers')
            .then(r => {
                    borrowings[worker] = r.data
                    setBorrowings(borrowings
                    )
                    console.log(borrowings)
                }
            ).catch(() => {
            borrowings[worker] = {satus: "no data"}
            setBorrowings(borrowings)
        })

        return (
            <Box pad="medium" background="light-2">
                <h3>Readers served:</h3>
                <Box> <BorrowingPeriod/></Box>
                <ReaderBorrowingTable borrowings={borrowings[worker]}/>
            </Box>
        );
    }

    return (
        <div>
            <h1>Workers</h1>
            <DataTable
                border={true}
                rowDetails={(row) => {
                    return getReaders(row.workerId)
                }}
                fill="horizontal"
                columns={[
                    {
                        property: 'workerId',
                        header: <Text>Id</Text>,
                        size: "small",
                        primary: true
                    },
                    {
                        property: 'workerName',
                        header: <Text>Worker</Text>
                    },
                    {
                        property: 'libraryName',
                        header: <Text>Library</Text>
                    },
                    {
                        property: 'readersCount',
                        header: <Text>Readers served</Text>
                    }
                ]}
                data={workers}
            />
        </div>
    )
}