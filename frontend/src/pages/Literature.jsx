import axios from "axios";
import {useState} from "react";
import * as React from "react";

export default function Literature(props) {
    const [literature, setLiterature] = useState([])
    const getLiterature = () => {
        axios.get('http://localhost:8080/api/v1/literature')
            .then(res => {
                console.log(res.data)
                setLiterature(res.data)
            })
    }

    React.useEffect(() => {getLiterature()}, []);

    const data = React.useMemo(() => literature, [literature])
    const columns = React.useMemo(
        ()=>[
            {
                Header: 'name',
                accessor: '',
            }
        ],
        []
    )

    return (
        <div>
                literature
        </div>
    )
}