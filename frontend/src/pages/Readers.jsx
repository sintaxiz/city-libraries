import * as React from "react";
import {TextInput, Button, Box, DateInput, Text, DataTable} from "grommet";
import axios from "axios";

export default function Readers(props) {
    const [literature, setLiterature] = React.useState('');
    const [borrowDate, setBorrowDate] = React.useState('');
    const [returnDate, setReturnDate] = React.useState('');

    const [readers, setReaders] = React.useState([])

    function Reader(props) {
        return (<tr>
                <td>{props.name}</td>
                <td>{props.library}</td>
                <td>{props.publication}</td>
                <td>{props.date}</td>
            </tr>
        )
    }

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
        console.log("params for readers request: " + requestParams)
        axios.get('http://localhost:8080/api/v1/readers/literature',
            requestParams
        )
            .then(res => {
                console.log(res.data)
                setReaders(res.data)
            })
    }

    React.useEffect(() => {}, []);

    return (
        <div>
            <h1>Readers</h1>
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
                                setBorrowDate(value)
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
                                setReturnDate(value)
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