import React, { useEffect, useState } from "react";
import AxiosInstance from "./Axios";
import {Box, Typography} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextForm from "./forms/Textform";
import SelectForm from "./forms/Selectform";
import MultipleSelect from "./forms/MultiSelect";
import MultilineTextFields from "./forms/TextLarge";
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import * as yup from 'yup';
import MyMessage from "./forms/Message";
import { useNavigate } from 'react-router';
import { useParams } from "react-router";





const Edit = ()=>{

    const [country, setCountry] = useState([])
    const [league, setLeague] = useState([])
    const [character, setCharacter] = useState([])
    const [message, setMessage] = useState([])
    const [club, setclub] = useState(
        {
            name: '',
            country: '',
            league:'',
            city: '',
            attendence: 0,
            description: '',
            characteristics: []

        }
    )
    const navigate = useNavigate()
    const param = useParams()


    const id = param.id

    const GetData = ()=>{ 
        AxiosInstance.get('country/').then((res)=>{
            setCountry(res.data)
        })
        AxiosInstance.get('league/').then((res)=>{
            setLeague(res.data)
        })
        AxiosInstance.get('characteristic/').then((res)=>{
            setCharacter(res.data)
        })
        AxiosInstance.get(`Clubs/${id}/`).then((res)=>{
            setclub(res.data)
        })
    }
    useEffect(()=> {
        GetData()
    }, [])
    

    
    

    const validationSchema = yup.object({
        name : yup.string("Must be text")
                .required("this field is required"),

        attendence: yup.number("Must be a number")
                    .required("this field is required"),

        characteristics: yup.array().min(1, "Select atleast one"),

        description: yup.string().required("this field is required"),



    })
    const formik = useFormik({
        initialValues:{
            name: club.name,
            country: club.country,
            league: club.league,
            city: club.city,
            attendence: club['attendence'],
            description: club['description'],
            characteristics: club['characteristics']

        },
        validationSchema: validationSchema,
        enableReinitialize:true,

        onSubmit: (values)=>{
            AxiosInstance.put(`Clubs/${id}/`, values)
            .then(()=>{
                setMessage(
                    <MyMessage
                        MyMessageText = {"Club edited succufully!"}
                        bgcolor= {"green"}
                    />
                )
                setTimeout(()=> {
                    navigate('/')
                }, 1500)
            })
            
        }

    })
    return (
        <div>
            <Box className={"TopBar"} >
                <AddBoxIcon/>
                <Typography sx={{marginLeft:'10px', fontWeight:'bold'}}>Edit the club's data</Typography>
            </Box>

            
            {message}
            

        <form onSubmit={formik.handleSubmit}>
            <Box className={'FormBox'}>

                <Box className={'FormArea'}>

                    <TextForm label = {'Club Name'}
                    name= 'name'
                    value= {formik.values.name}
                    onChange = {formik.handleChange}
                    onBlur = {formik.handleBlur}
                    error = {formik.touched.name && Boolean(formik.errors.name)}
                    helperText = {formik.touched.name && formik.errors.name}
                    />

                    <Box sx={{'marginTop': '10px'}}>
                        <TextForm label = {'Club City'}
                        name= 'city'
                        value= {formik.values.city}
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        error = {formik.touched.city && Boolean(formik.errors.city)}
                        helperText = {formik.touched.city && formik.errors.city}
                        />
                    </Box>

                    <Box sx={{'marginTop': '10px'}}>
                        <SelectForm
                        label = {'Club Country'}
                        options = {country}
                        name= 'country'
                        value= {formik.values.country}
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        error = {formik.touched.country && Boolean(formik.errors.country)}
                    helperText = {formik.touched.country && formik.errors.country}
                        />
                    </Box>

                    <Box sx={{'marginTop': '15px'}}>
                        <Button type="submit" variant="contained">Save Edit</Button>
                    </Box>

                </Box>

                <Box className={'FormArea'}>
                    <SelectForm
                        label = {'Club League'}
                        options = {league}
                        name= 'league'
                        value= {formik.values.league}
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        error = {formik.touched.league && Boolean(formik.errors.league)}
                    helperText = {formik.touched.league && formik.errors.league}
                    />

                    <Box sx={{'marginTop': '10px'}}>
                        <TextForm label = {'Attendence'}
                        name= 'attendence'
                        value= {formik.values.attendence}
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        error = {formik.touched.attendence && Boolean(formik.errors.attendence)}
                    helperText = {formik.touched.attendence && formik.errors.attendence}
                        />
                    </Box>

                    <Box sx={{'marginTop': '10px'}}>
                        <MultipleSelect
                        label = {'Characteristic'}
                        options = {character}
                        name= 'characteristics'
                        value= {formik.values.characteristics}
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        error = {formik.touched.characteristics && Boolean(formik.errors.characteristics)}
                    helperText = {formik.touched.characteristics && formik.errors.characteristics}
                        />
                    </Box>

                </Box>

                

                <Box className={'FormArea'}>
                    <MultilineTextFields label = {'Description'}
                        name= 'description'
                        value= {formik.values.description}
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                    />
                </Box>




            </Box>
        </form>
        </div>
    );
}

export default Edit