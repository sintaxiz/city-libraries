import axios from "axios"
import * as React from "react"
import {useState} from "react";


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
            <table>
                <tr>
                    <th>Name</th>
                    <th>Location</th>
                </tr>
                {libraries.map((lib) => <Library name={lib.name} location={lib.location}/>)}
            </table>
        </div>
    )
}