import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import { useNavigate } from 'react-router-dom'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import axios from '../helpers/api'

import MyDialog from '../components/helpers/MyDialog'
import MySnackbar from '../components/helpers/MySnackbar'

const Resources = () => {
    const [resources, setResources] = useState([])
    const [loading, setLoading] = useState(false)
    const [pageSize, setPageSize] = useState(9)
    const [selectedResource, setSelectedResource] = useState(null)
    const [dialog, setDialog] = useState(false)
    const [snackbar, setSnackbar] = useState(false)
    const navigate = useNavigate()

    const showDialog = (id) => () => {
        setSelectedResource(id)
        setDialog(true)
    }

    const handleDelete = async () => {
        setDialog(false)
        setLoading(true)

        try {
            try {
                const res = await axios.delete(`/resource/${selectedResource}`)
                if (res.status === 204) {
                    setResources(
                        resources.filter((res) => res.id !== selectedResource)
                    )
                    setSnackbar(true)
                }
            } catch (err) {
                console.log(err)
            }
        } catch (error) {}
        setLoading(false)
    }

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 90,
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 120,
        },
        {
            field: 'year',
            headerNAme: 'Year',
            width: 90,
        },
        {
            field: 'color',
            headerName: 'Color',
            renderCell: ({ value }) => (
                <div
                    style={{
                        backgroundColor: value.color,
                        borderRadius: '50%',
                        width: '100%',
                        height: '100%',
                        cursor: 'pointer',
                    }}
                    onClick={() => navigate(`/resources/${value.id}`)}
                ></div>
            ),
            width: 80,
            sortable: false,
        },
        {
            field: 'pantone',
            headerName: 'Pantone Value',
            width: 120,
            sortable: false,
        },
        {
            field: 'edit',
            headerName: 'Edit',
            renderCell: ({ value }) => {
                return (
                    <IconButton
                        color="primary"
                        onClick={() => navigate(`/resources/${value}/edit`)}
                    >
                        <EditIcon />
                    </IconButton>
                )
            },
            width: 90,
            sortable: false,
        },
        {
            field: 'delete',
            headerName: 'Delete',
            renderCell: ({ value }) => {
                const handleDelete = async () => {}

                return (
                    <IconButton color="error" onClick={showDialog(value)}>
                        <DeleteIcon />
                    </IconButton>
                )
            },
            width: 90,
            sortable: false,
        },
    ]

    const getResource = async () => {
        setLoading(true)

        try {
            const { data: res1 } = await axios.get('/resource?page=1')
            const { data: res2 } = await axios.get('/resource?page=2')

            setResources([
                ...res1.data.map((resource) => ({
                    id: resource.id,
                    name: resource.name,
                    year: resource.year,
                    color: {
                        id: resource.id,
                        color: resource.color,
                    },
                    pantone: resource.pantone_value,
                    edit: resource.id,
                    delete: resource.id,
                })),
                ...res2.data.map((resource) => ({
                    id: resource.id,
                    name: resource.name,
                    year: resource.year,
                    color: {
                        id: resource.id,
                        color: resource.color,
                    },
                    pantone: resource.pantone_value,
                    edit: resource.id,
                    delete: resource.id,
                })),
            ])
        } catch (err) {
            console.log(err)
        }

        setLoading(false)
    }

    useEffect(() => {
        getResource()
    }, [])

    return loading ? (
        <CircularProgress />
    ) : (
        <>
            <DataGrid
                rows={resources}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={[6, 9, 12]}
                disableColumnMenu
                disableSelectionOnClick
                onPageSizeChange={(size) => setPageSize(size)}
            />
            <MyDialog
                open={dialog}
                setOpen={setDialog}
                onConfirm={handleDelete}
                title="Warning"
                text="Are you sure you want to delete this user?"
            />
            <MySnackbar
                severity="success"
                open={snackbar}
                setOpen={setSnackbar}
            >
                User Deleted Successfully
            </MySnackbar>
        </>
    )
}

export default Resources
