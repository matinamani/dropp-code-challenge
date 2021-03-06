import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

import axios from '../helpers/api'

const Home = () => {
    const [users, setUsers] = useState(0)
    const [resource, setResource] = useState(0)
    const [userLoading, setUserLoading] = useState(false)
    const [resourceLoading, setResourceLoading] = useState(false)

    const getUsers = async () => {
        setUserLoading(true)
        const { data: res } = await axios.get('/users')
        setUsers(res.total)
        setUserLoading(false)
    }

    const getResources = async () => {
        setResourceLoading(true)
        const { data: res } = await axios.get('/unknown')
        setResource(res.total)
        setResourceLoading(false)
    }

    const getData = async () => {
        try {
            await getUsers()
            await getResources()
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Box sx={{ height: '100%', width: '100%', p: 2 }}>
            <Grid
                container
                justifyContent="stretch"
                alignItems="flex-start"
                spacing={2}
            >
                <Grid item xs={6}>
                    <Paper
                        sx={{ p: 4, bgcolor: 'success.main' }}
                        elevation={12}
                    >
                        <Typography variant="h4" paragraph align="center">
                            Total Users
                        </Typography>
                        {userLoading ? (
                            <CircularProgress />
                        ) : (
                            <Typography variant="h3" align="center">
                                {users}
                            </Typography>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={{ p: 4, bgcolor: 'info.main' }} elevation={12}>
                        <Typography variant="h4" paragraph align="center">
                            Total Resources
                        </Typography>
                        {resourceLoading ? (
                            <CircularProgress />
                        ) : (
                            <Typography variant="h3" align="center">
                                {resource}
                            </Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Home
