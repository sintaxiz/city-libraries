import {DataTable, Text} from "grommet";
import * as React from "react";

export default function PublicationsTable(props) {
    console.log(props.publications)
    return(
        <DataTable
            border={true}
            fill="horizontal"
            columns={[
                {
                    property: 'id',
                    header: <Text>id</Text>
                },
                {
                    property: 'name',
                    header: <Text>Name</Text>
                },
                {
                    property: 'type',
                    header: <Text>Type</Text>
                },
                {
                    property: 'receiptDate',
                    header: <Text>Receipt date</Text>,
                    size: "small"
                },
                {
                    property: 'throwDate',
                    header: <Text>Throw date</Text>,
                    size: "small"
                },
            ]}
            data={props.publications}
        />)
}