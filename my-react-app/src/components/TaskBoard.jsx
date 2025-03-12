import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Box, Typography, Divider, Button } from '@mui/material'

const TaskBoard =(props) =>{
    const { task } = props
    const navigate = useNavigate()
    const handleEditClick = (id) =>{
        navigate(`/process?fromWhere=${id}`)
    }

    const handleDeleteClick = (id) =>{
        axios.delete(`http://localhost:5001/delete/${id}`).then(res=>{
            console.log(res)
        })
        console.log(id)
    }
    
    return(
        <Box key = {task.id} sx={{display:'flex', flexDirection:'row', width:'320px', marginTop:'20px', overflow:'hidden'}}>
            <Box className='task info'>
            <Typography>Title: {task.title}</Typography>
            <Typography>Description: {task.description}</Typography>
            <Typography>Status: {task.status}</Typography>
            <Divider/>
            </Box>
            <Button onClick={()=>handleEditClick(task.id)}>Edit</Button>
            <Button onClick={()=>handleDeleteClick(task.id)}>Delete</Button>
        </Box>
    )
    
}

export default TaskBoard
