import * as React from "react";
import {TextInput, Button, Box, DateInput, Text, DataTable} from "grommet";
import axios from "axios";

export default function Readers(props) {

    const [readers, setReaders] = React.useState([])

    const getAll = () => {
        axios.get('http://localhost:8080/api/v1/readers')
            .then(res => {
                console.log(res.data)
                setReaders(res.data)
            })
    }

    React.useEffect(() => {
        getAll()
    }, []);

    return (
        <div>
            <h1>Readers</h1>
            <DataTable
                border={true}
                fill="horizontal"
                resizeable="true"
                columns={[
                    {
                        property: 'id',
                        header: <Text>id</Text>,
                        size:"small",
                        primary: true,
                    },
                    {
                        property: 'name',
                        header: <Text>Name</Text>,
                    },
                    {
                        property: 'categoryId',
                        header: <Text>Category id</Text>,
                    }
                ]}
                data={readers}
            />
        </div>
    )
}