import * as React from "react";
import {DataTable, Text} from "grommet";
import axios from "axios";

export default function Publications(props) {
    const [publications, setPublications] = React.useState([])

    const getAll = () => {
        axios.get('http://localhost:8080/api/v1/publications')
            .then(res => {
                console.log(res.data)
                setPublications(res.data)
            })
    }

    React.useEffect(()=> {getAll()}, [])

    return (
        <div>
            <h1>Publications</h1>

            <DataTable
                border={true}
                fill="horizontal"
                resizeable="true"
                columns={[
                    {
                        property: 'id',
                        header: <Text>id</Text>,
                        size:"small",
                        primary: true
                    },
                    {
                        property: 'name',
                        header: <Text>Name</Text>
                    },
                    {
                        property: 'type',
                        header: <Text>Type</Text>
                    }
                ]}
                data={publications}
            />
        </div>
    )
}