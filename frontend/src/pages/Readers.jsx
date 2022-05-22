import * as React from "react";
import {TextInput, Button, Box, DateInput, Text, DataTable, Select, Heading} from "grommet";
import axios from "axios";

export default function Readers(props) {

    const NONE_CATEGORY_NAME = "none"

    const [readers, setReaders] = React.useState([])
    const [categories, setCategories] = React.useState([])
    const [selectedCategory, setSelectedCategory] = React.useState('')
    const [searchParams, setSearchParams] = React.useState(new Map())

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

    function searchReadersWithParams() {
        if (selectedCategory === NONE_CATEGORY_NAME) {
            searchParams.set("categoryId",0)
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

            <Heading>Readers</Heading>


            <Box direction="column">
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
                        searchReadersWithParams()
                    }}/>
                </Box>
            </Box>

            <Box>
                <DataTable
                    border={true}
                    rowDetails={() => {
                        return (<Text>Test</Text>)
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