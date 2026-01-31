import DatasetIcon from '@mui/icons-material/Dataset';
import AxiosInstance from "./Axios";
import {Box, Typography, IconButton} from '@mui/material';
import React, { useEffect, useState, useMemo } from "react";
import {MaterialReactTable} from 'material-react-table';
import { Link } from 'react-router';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MyMessage from './forms/Message';
import { useNavigate } from 'react-router';


const Home = ()=>{
    const [clubs, setClubs] = useState([])
    const [message, setMessage] = useState([])
    const navigate = useNavigate()

    const GetData = ()=>{ 
    AxiosInstance.get('api/Clubs/').then((res) =>{
        setClubs(res.data)
    })}
    useEffect(()=> {
            GetData()
        }, [])

    const columns = useMemo(
        ()=>[
        {
            accessorKey: 'name',
            header: 'Name'
        },
        {
            accessorKey: 'country_details.name',
            header: 'Country'
        },
        {
            accessorKey: 'city',
            header: 'City'
        },
        {
            accessorKey: 'league_details.name',
            header: 'League'
        },
        {
            accessorKey: 'characters_details',
            header: 'Characteristics'
        },


    ])

    const DeleteClub = (id)=> {
        AxiosInstance.delete(`api/Clubs/${id}/`)
        .then(()=>{
                setMessage(
                    <MyMessage
                        MyMessageText = {"Club deleted succufully!"}
                        bgcolor= {"green"}
                    />
                    )
                    setTimeout(()=> {
                        GetData()
                        setMessage('')
                }, 1500)
            })

    }
    
    return (
        
        <div>
            <Box className={"TopBar"} >
                <DatasetIcon/>
                <Typography sx={{marginLeft:'10px', fontWeight:'bold'}}>View all Clubs</Typography>
            </Box>

            {message}

            <MaterialReactTable
            columns={columns}
            data={clubs}
            enableRowActions
            renderRowActions={({row})=> (
                <Box sx={{display: 'flex', flexWrap: 'nowrap', gap: '8px'}}>
                    <IconButton color='primary' component={Link} to={`/edit/${row.original.id}`}>
                        <EditIcon/>
                    </IconButton>

                    <IconButton color='red' onClick={() => DeleteClub(row.original.id)}>
                        
                        <DeleteIcon/>
                    </IconButton>
                </Box>

               

            )}
            
            />
        </div>
    )
}

export default Home