import * as React from "react";
import {Box, Button, DataTable, DateInput, Text, TextInput} from "grommet";
import axios from "axios";
import PublicationsTable from "../components/PublicationsTable";

export default function Publications(props) {
    const [publications, setPublications] = React.useState([])
    const [borrowDate, setBorrowDate] = React.useState()
    const [returnDate, setReturnDate] = React.useState()
    const [literature, setLiterature] = React.useState()

    const getAll = () => {
        axios.get('http://localhost:8080/api/v1/publications')
            .then(res => {
                console.log(res.data)
                setPublications(res.data)
            })
    }

    React.useEffect(() => {
        getAll()
    }, [])

    return (
        <div>
            <h1>Publications</h1>
            <TextInput
                placeholder="literature name"
                value={literature}
                onChange={event => setLiterature(event.target.value)}
            />
            <Box direction="row" >

                <Box direction="row">
                    <Text textAlign="start">
                        receipt date:
                    </Text>
                    <DateInput
                        format="mm/dd/yyyy"
                        value={borrowDate}
                        onChange={({value}) => {
                            props.setBorrow(value.toString())
                            setBorrowDate(value)
                        }}
                    />
                </Box>
                <Box direction="row">
                    <Text textAlign="start">
                        throw date:
                    </Text>
                    <DateInput
                        format="mm/dd/yyyy"
                        value={returnDate}
                        onChange={({value}) => {
                            props.setReturn(value.toString())
                            setReturnDate(value)
                        }}
                    />

                </Box>
                <Box pad="small">
                    <Button primary
                            label="search"
                            onClick={()=>{}}/>
                </Box>
            </Box>

            <PublicationsTable publications={publications}/>
        </div>
    )
}