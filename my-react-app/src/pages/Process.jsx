import { useState } from "react"
import { Box, Select, MenuItem, TextField, Button, InputLabel } from "@mui/material"
import axios from 'axios'
import { useNavigate, useSearchParams } from "react-router-dom"

const re =  /^(?=.*[A-Za-z])[A-Za-z0-9]+$/

const ProcessPage = () =>{
    const [searchParams] = useSearchParams()
    const fromWhere = searchParams.get("fromWhere")
    console.log(fromWhere)
    const navigate = useNavigate()
    const [formInfo, setFormInfo] = useState({title:'', description:'',status:'To Do'})
    const handleSubmit = (event) => {
        // check title
        if (formInfo.title.length > 0 && re.test(formInfo.title)){
            if (fromWhere == 'Add'){
                //submit
                axios.post(`http://localhost:5001/create`,{title:formInfo.title, description:formInfo.description,status:formInfo.status})
                .then(res=>{
                console.log(res)
                })
            }
            else{
                //update
                const id = parseInt(fromWhere)
                axios.put(`http://localhost:5001/update/${id}`,{title:formInfo.title, description:formInfo.description,status:formInfo.status})
                .then(res=>{
                console.log(res)
                })
            }
            
            console.log(formInfo)
            event.preventDefault()
            
        }
    }
    const handleBack = () => {
        navigate('/')
    }


    return (
        <Box>
        <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column',gap:'30px'}}>
            <Box sx={Styles.lineContainer}>
                <InputLabel>Title: </InputLabel>
                <TextField
                required
                id="title"
                label="Required"
                onChange={(e)=>{setFormInfo({...formInfo, title:e.target.value})}}
                sx={{width:'200px'}}
                />
            </Box>
            <Box sx={Styles.lineContainer}>
                <InputLabel>Description: </InputLabel>
                <TextField
                required
                id="title"
                label="Required"
                onChange={(e)=>{setFormInfo({...formInfo, description:e.target.value})}}
                sx={{width:'200px'}}
                />
            </Box>
            <Box sx={Styles.lineContainer}>
                <InputLabel >Status:</InputLabel>
                <Select
                    value={formInfo.status}
                    label={'Status'}
                    onChange={(e)=>{setFormInfo({...formInfo, status:e.target.value})}}
                >
                    <MenuItem value='To Do'>ToDo</MenuItem>
                    <MenuItem value='In Progress'>In Progress</MenuItem>
                    <MenuItem value='Done'>Done</MenuItem>
                </Select>
            </Box>
            <Button type="submit">Submit</Button>   
        </form>
        <Button onClick={handleBack}>Go back to Homepage</Button>
        </Box>
    )
}

const Styles = {
    lineContainer: {width:'320px', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', gap:'20px'}
}
export default ProcessPage
