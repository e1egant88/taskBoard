import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import TaskBoard from '../components/TaskBoard'

const Home = () =>{
    const navigate = useNavigate()
    const [onlyInProgress, setOnlyInProgress] = useState(false)
    const [tasks, setTasks] = useState([])
    const fetchTasks = async() =>{
        axios.get('http://localhost:5001/tasks').then(res => {
            const tasksFromDB = res.data
            setTasks(tasksFromDB)
        })
    }
   
    useEffect(()=>{
        fetchTasks()
    },[])
    
    const handleRefresh = () =>{
        fetchTasks()
    }

    const handleAddClick = () =>{
        navigate('/process?fromWhere=Add')
    }

    return (
    <Box>
        <Button onClick = {handleAddClick}>Add new tasks</Button>
        <Button onClick = {handleRefresh}>Refresh task board</Button>
        <Button onClick={()=>{setOnlyInProgress(!onlyInProgress)}}>Only in progress</Button>
        <Typography variant='h4'>Task Board</Typography>
        {
        tasks.map((task) => {
            if (!onlyInProgress){
                return(
                    <TaskBoard task={task}/>
                )
            }
            else{
                if (task.status != 'In Progress')
                    return
                else{
                    return(
                        <TaskBoard task={task}/>
                    )
                }
            }
        })
        }
    </Box>
    )
}

export default Home
