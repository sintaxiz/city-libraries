import axios from "axios"
import * as React from "react"
import {useState} from "react";
import {DataTable, Text} from "grommet";


function Library(props) {
    return (<tr>
            <td>{props.name}</td>
            <td>{props.location}</td>
        </tr>
    )
}

export default function Libraries(props) {
    const [libraries, setLibraries] = useState([])
    const getAll = () => {
        axios.get('http://localhost:8080/api/v1/libraries')
            .then(res => {
                console.log(res.data)
                setLibraries(res.data)
            })
    }

    React.useEffect(() => {getAll()}, []);

    return (
        <div>
            <h1>Libraries</h1>
            <DataTable
                border={true}
                fill="horizontal"
                columns={[
                    {
                        property: 'id',
                        header: <Text>id</Text>,
                        size:"small",
                        primary: true
                    },
                    {
                        property: 'location',
                        header: <Text>Location</Text>
                    },
                    {
                        property: 'name',
                        header: <Text>Name</Text>
                    }
                ]}
                data={libraries}
            />
        </div>
    )
}