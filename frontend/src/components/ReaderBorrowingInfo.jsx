import {Box, Button, DataTable, DateInput, Text, TextInput} from "grommet";
import * as React from "react";
import axios from "axios";

export default function ReaderBorrowingInfo() {
    const [literature, setLiterature] = React.useState('');
    const [borrowDate, setBorrowDate] = React.useState('');
    const [returnDate, setReturnDate] = React.useState('');

    const [readers, setReaders] = React.useState([])

    const searchReadersWithLiterature = () => {
        console.log("search readers with literature = " + literature)
        let requestParams = {}
        if (borrowDate === '' && returnDate === '') {
            requestParams = {
                params: {literature: literature}
            }
        } else {
            requestParams = {
                params: {
                    literature: literature,
                    borrowDate: borrowDate,
                    returnDate: returnDate
                }
            }
        }
        console.log("params for readers request: " + requestParams.params)
        axios.get('http://localhost:8080/api/v1/readers/literature',
            requestParams
        )
            .then(res => {
                console.log(res.data)
                setReaders(res.data)
            })
    }

    return (
        <div>
            <Box
                direction="row"
                pad="small">
                <Box pad="small">
                    <TextInput
                        placeholder="literature name"
                        value={literature}
                        onChange={event => setLiterature(event.target.value)}
                    />
                    <Box direction="row">
                        <Text textAlign="start">
                            borrow date:
                        </Text>
                        <DateInput
                            format="mm/dd/yyyy"
                            value={(new Date()).toISOString()}
                            onChange={({value}) => {
                                setBorrowDate(value.toString())
                                console.log("set borrowing date = " + borrowDate)
                            }}
                        />
                    </Box>
                    <Box direction="row">
                        <Text textAlign="start">
                            return date:
                        </Text>
                        <DateInput
                            format="mm/dd/yyyy"
                            value={(new Date()).toISOString()}
                            onChange={({value}) => {
                                setReturnDate(value.toString())
                                console.log("set return date = " + returnDate)
                            }}
                        />
                    </Box>
                </Box>
                <Box pad="small">
                    <Button primary
                            label="search readers"
                            onClick={searchReadersWithLiterature}/>
                </Box>
            </Box>

            <DataTable
                border="true"
                fill="horizontal"
                resizeable="true"
                columns={[
                    {
                        property: 'readerName',
                        header: <Text>Reader name</Text>,
                        primary: true,
                    },
                    {
                        property: 'library',
                        header: <Text>Library</Text>,
                    },
                    {
                        property: 'publicationName',
                        header: <Text>Publication</Text>,
                    },
                    {
                        property: 'borrowingDate',
                        header: <Text>Borrowing date</Text>,
                    }
                ]}
                data={readers}
            />
        </div>

    )
}