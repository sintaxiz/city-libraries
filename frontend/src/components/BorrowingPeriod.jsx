import {Box, DateInput, Text} from "grommet";
import * as React from "react";


export default function BorrowingPeriod(props) {
    const [borrowDate, setBorrowDate] = React.useState()
    const [returnDate, setReturnDate] = React.useState()

    return (
        <div>
            <Box direction="row">
                <Text textAlign="start">
                    borrow date:
                </Text>
                <DateInput
                    format="mm/dd/yyyy"
                    value={borrowDate}
                    onChange={({value}) => {
                        props.setBorrow(value.toString())
                        setBorrowDate(value)
                    }}
                />
            </Box>
            <Box direction="row">
                <Text textAlign="start">
                    return date:
                </Text>
                <DateInput
                    format="mm/dd/yyyy"
                    value={returnDate}
                    onChange={({value}) => {
                        props.setReturn(value.toString())
                        setReturnDate(value)
                    }}
                />
            </Box>
        </div>
)
}