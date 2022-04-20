import axios from "axios"
import * as React from "react"


function Library(props) {
    return <li>{props.name}</li>
}

export default function Libraries(props) {
    const [data, setData] = React.useState([])
    const getAll = () => {
        axios.get('http://localhost:8080/api/v1/libraries')
            .then(res => {
                console.log(res.data)
                setData(res.data)
            })
    }

    React.useEffect(() => {
        getAll()
    })

    return (
        <ul>
            {data.map((lib) => <Library name={lib.name} />)}
        </ul>
    )
}