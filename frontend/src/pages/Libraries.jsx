import axios from "axios"
import * as React from "react"
import {useState} from "react";
import {Accordion, AccordionPanel, Box, DataTable, Text} from "grommet";
import BorrowingsTable from "../components/BorrowingsTable";

export default function Libraries(props) {
    const [libraries, setLibraries] = useState([])
    const getAll = () => {
        axios.get('http://localhost:8080/api/v1/libraries')
            .then(res => {
                console.log(res.data)
                setLibraries(res.data)
            })
    }

    React.useEffect(() => {
        getAll()
    }, []);


    const [librariesPublications, setLibrariesPublications] = React.useState([])

    function getPublications(libPublications) {
        return (
            <div>
                <Box pad="medium" background="light-2">
                    <h3>Borrowings in this library:</h3>
                    <BorrowingsTable publications={libPublications}/>
                </Box>
            </div>

        );
    }

    function getInsideLibraryInfo(lib) {
        axios.get('http://localhost:8080/api/v1/libraries/' + lib.id + '/publications')
            .then(r => {
                    librariesPublications[lib.id] = r.data
                    setLibrariesPublications(librariesPublications
                    )
                    console.log(librariesPublications)
                }
            ).catch(() => {
            librariesPublications[lib.id] = {satus: "no data"}
            setLibrariesPublications(librariesPublications)
        })

        return (<div>
            {
                getPublications(librariesPublications[lib.id])
            }
        </div>)
    }

    return (
        <div>
            <h1>Libraries</h1>
            <DataTable
                border={true}
                rowDetails={(row) => {
                    return getInsideLibraryInfo(row)
                }}
                fill="horizontal"
                columns={[
                    {
                        property: 'id',
                        header: <Text>id</Text>,
                        size: "small",
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