import axios from "axios";
import {useState} from "react";
import * as React from "react";
import {DataTable, Text} from "grommet";

export default function Literature(props) {
    const [literature, setLiterature] = useState([])
    const getLiterature = () => {
        axios.get('http://localhost:8080/api/v1/literature')
            .then(res => {
                console.log(res.data)
                setLiterature(res.data)
            })
    }

    React.useEffect(() => {
        getLiterature()
    }, []);

    return (
        <div>
            <h1>Literature</h1>

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
                        property: 'title',
                        header: <Text>Title</Text>
                    },
                    {
                        property: 'author',
                        header: <Text>Author</Text>
                    },
                    {
                        property: 'year',
                        header: <Text>Year</Text>
                    }
                ]}
                data={literature}
            />
        </div>
    )
}