import React from 'react';
import {Box, Text} from "grommet";

const ReaderParams = function(props) {
    return (
        <Box direction="row">
            <Text>{props.param}: {props.value}</Text>
        </Box>
    )
}

export default ReaderParams