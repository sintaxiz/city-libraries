import {Box, Button, CheckBox, DataTable, DateInput, RadioButtonGroup, Text, TextInput} from "grommet";
import * as React from "react";
import axios from "axios";
import BorrowingPeriod from "./BorrowingPeriod";

export default function ReaderBorrowingInfo() {
    const [literature, setLiterature] = React.useState([]);
    const [publication, setPublication] = React.useState([]);
    const [borrowDate, setBorrowDate] = React.useState('');
    const [returnDate, setReturnDate] = React.useState('');
    const [isOnlyExpired, setIsOnlyExpired] = React.useState(false)
    const [registredValue, setRegistredValue] = React.useState(false)

    const [borrowings, setBorrowings] = React.useState([])

    const searchReadersWithLiterature = () => {
        if (isOnlyExpired) {
            axios.get("http://localhost:8080/api/v1/borrowings/expired")
                .then(r => {
                    console.log(r.data)
                    setBorrowings(r.data)
                })
            return
        }
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
                setBorrowings(res.data)
            })
    }
    React.useEffect(() => {
        loadBorrowings()
    }, []);

    const loadBorrowings = () => {
        axios.get('http://localhost:8080/api/v1/borrowings')
            .then(res => {
                console.log(res.data)
                setBorrowings(res.data)
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
                    <TextInput
                        placeholder="publication name"
                        value={publication}
                        onChange={event => setPublication(event.target.value)}
                    />
                   <BorrowingPeriod setBorrow={setBorrowDate} setReturn={{setReturnDate}}/>
                    <Box>
                        <Text>
                            Search in the library where the reader was registered?
                        </Text>
                        <RadioButtonGroup
                            name="doc"
                            options={['no matter', 'yes', 'no']}
                            value={registredValue}
                            onChange={(event) => {setRegistredValue(event.target.value)}}
                        />
                        <CheckBox
                            checked={isOnlyExpired}
                            label="Find only expired"
                            onChange={(event) => setIsOnlyExpired(event.target.checked)}
                        />
                    </Box>
                </Box>
                <Box pad="small">
                    <Button primary
                            label="search"
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
                    },
                    {
                        property: 'returnDate',
                        header: <Text>Return date</Text>,
                    },
                    {
                        property: 'returnTerm',
                        header: <Text>Return term</Text>,
                    }
                ]}
                data={borrowings}
            />
        </div>

    )
}