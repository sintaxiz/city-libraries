import * as React from "react";
import {TextInput, Button, Box, DateInput, Text, DataTable, Select, Heading, CheckBox} from "grommet";
import axios from "axios";
import ReaderParams from "../components/ReaderParams";

export default function Readers(props) {

    const NONE_CATEGORY_NAME = "none"

    const [readers, setReaders] = React.useState([])
    const [categories, setCategories] = React.useState([])
    const [selectedCategory, setSelectedCategory] = React.useState('')
    const [searchParams, setSearchParams] = React.useState(new Map())
    const [readerParams, setReaderParams] = React.useState({})

    const [isDidntAttend, setIsDidntAttend] = React.useState(false)
    const [startAttendDate, setStartAttendDate] = React.useState()
    const [endAttendDate, setEndAttendDate] = React.useState()

    const addCategoryNameToReaders = (categories, readers) => {
        return readers
            .map(reader => {
                reader.categoryId !== null
                    ? reader["categoryName"] = categories
                        .find((category) => {
                            return (category.id === reader.categoryId)
                        })
                        .name
                    : reader["categoryName"] = NONE_CATEGORY_NAME
                return reader
            })
    }

    const getReaders = (categories) => {
        axios.get('http://localhost:8080/api/v1/readers/all')
            .then(res => {
                setReaders(
                    addCategoryNameToReaders(categories, res.data)
                )
                console.log(readers)
            })
    }

    function getReaderParams(reader) {
        axios.get('http://localhost:8080/api/v1/readers/' + reader.categoryId + '/' + reader.id + '/')
            .then(r => {
                    let currentReaderParams = r.data
                    readerParams[reader.id] = currentReaderParams
                    setReaderParams(readerParams
                    )
                    console.log(readerParams)
                }
            ).catch(() => {
            readerParams[reader.id] = {satus: "no data"}
            setReaderParams(readerParams)
        })
        return (
            <Box margin='small' background="light-2">
                <div>
                    <h3>Reader params:</h3>
                    {readerParams[reader.id] !== undefined &&
                        Object.keys(readerParams[reader.id])
                            .map(key =>
                                <ReaderParams param={key} value={readerParams[reader.id][key]}/>
                            )}
                </div>
            </Box>

        )

    }

    const getAll = () => {
        axios.get('http://localhost:8080/api/v1/readers/categories')
            .then(res => {
                console.log(res.data)
                setCategories(res.data)
                return res.data
            })
            .then((categories) => {
                getReaders(categories)
            })
    }

    React.useEffect(() => {
        getAll()
    }, []);

    function getCategoriesNameForSelect() {
        let catForSelect = categories.map(cat => cat.name)
        catForSelect.push(NONE_CATEGORY_NAME)
        return catForSelect
    }

    function searchReaders() {
        if (isDidntAttend) {
            axios.get('http://localhost:8080/api/v1/readers/not-attend')
                .then(r => setReaders(r.data))
            return
        }
        if (undefined === selectedCategory) {
            getAll();
            return;
        }
        if (selectedCategory === NONE_CATEGORY_NAME) {
            searchParams.set("categoryId", 0)
        } else {
            let category = categories.find((category) => {
                return (category.name === selectedCategory)
            })
            setSearchParams(
                searchParams.set("categoryId", category.id)
            )
        }
        console.log(categories)
        console.log(searchParams)

        axios.get('http://localhost:8080/api/v1/readers', {
                params:
                    Object.fromEntries(searchParams)
            }
        ).then(r => {
                setReaders(addCategoryNameToReaders(categories, r.data))
            }
        )
    }

    return (
        <Box direction="column">

            <h1>Readers</h1>


            <Box direction="column">
                <Box pad="small" direction="row">
                    <CheckBox checked={isDidntAttend}
                              label="didn't attend from:"
                              onChange={(event) => setIsDidntAttend(event.target.checked)}
                                  />
                    <DateInput
                        format="mm/dd/yyyy"
                        value={startAttendDate}
                        onChange={({value}) => {
                            props.setBorrow(value.toString())
                            setStartAttendDate(value)
                        }}
                    />
                    <Text margin="small">to</Text>
                    <DateInput
                        format="mm/dd/yyyy"
                        value={endAttendDate}
                        onChange={({value}) => {
                            props.setBorrow(value.toString())
                            setEndAttendDate(value)
                        }}
                    />
                </Box>

                <Box pad="small" direction="row">
                    <Text margin="small">reader category:</Text>
                    <Select options={getCategoriesNameForSelect()}
                            value={selectedCategory}
                            onChange={({option}) => {
                                setSelectedCategory(option)
                            }}
                    />

                </Box>
                {selectedCategory === 'student' &&
                    <Box pad="small" direction="row">
                        <Text margin="small">university:</Text>
                        <TextInput
                            onChange={
                                event => {
                                    setSearchParams(
                                        searchParams.set("university", event.target.value)
                                    )
                                }}/>
                    </Box>
                }
                {selectedCategory === 'schoolboy' &&
                    <Box pad="small" direction="row">
                        <Box direction="column">
                            <Box direction="row">
                                <Text margin="small">school:</Text>
                                <TextInput
                                    onChange={
                                        event => {
                                            setSearchParams(
                                                searchParams.set("school", event.target.value)
                                            )
                                        }}
                                />
                            </Box>

                            <Box direction="row">
                                <Text margin="small">grade:</Text>
                                <TextInput
                                    onChange={
                                        event => {
                                            setSearchParams(
                                                searchParams.set("grade", event.target.value)
                                            )
                                        }}
                                />
                            </Box>
                        </Box>

                    </Box>
                }

                <Box pad="small" direction="row">
                    <Button label="search" onClick={() => {
                        searchReaders()
                    }}/>
                </Box>
            </Box>

            <Box>
                <DataTable
                    border={true}
                    rowDetails={(row) => {
                        return getReaderParams(row)
                    }}
                    fill={true}
                    columns={[
                        {
                            property: 'id',
                            header: <Text>id</Text>,
                            primary: true,
                        },
                        {
                            property: 'name',
                            header: <Text>Name</Text>,
                        },
                        {
                            property: 'categoryName',
                            header: <Text>Category</Text>,
                        }
                    ]}
                    data={readers}
                />
            </Box>

        </Box>
    )
}