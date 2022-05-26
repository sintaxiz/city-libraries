import axios from "axios";
import {useState} from "react";
import * as React from "react";
import {Box, DataTable, Text} from "grommet";
import Publications from "./Publications";
import PublicationsTable from "../components/PublicationsTable";

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

    const [publications, setPublications] = React.useState([])

    function getPublications(lit) {
        axios.get('http://localhost:8080/api/v1/literature/' + lit + '/publications')
            .then(r => {
                publications[lit] = r.data
                setPublications(publications)
            })
        return (
            <Box pad="medium" background="light-2">
                <h3>Can be found in publications:</h3>
                <PublicationsTable publications={publications[lit]}/>
            </Box>
        );
    }

    return (
        <div>
            <h1>Literature</h1>

            <DataTable
                border={true}
                rowDetails={(row) => getPublications(row.id)}
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