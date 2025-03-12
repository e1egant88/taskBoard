import { useState } from "react"
import { Box, InputLabel, TextField, Button } from "@mui/material"
import bcrypt from "bcryptjs-react";
import axios from "axios";


const LoginPage =({ onLogin }) =>{
    const [userInfo, setUserInfo] = useState({username:'', password:''})
    const handleSubmit = (e) => {
        const hash = bcrypt.hashSync(userInfo.password)
        axios.post(`http://localhost:5001/login`,{username:userInfo.username, password:hash}).then(res=>{
            if (res.statusText == 'OK')
                onLogin()
            
        })
        console.log(userInfo)

        e.preventDefault()
    }

    return(
        <form onSubmit={handleSubmit} >
            <Box>
                <InputLabel>Username: </InputLabel>
                <TextField
                required
                id="title"
                label="Required"
                onChange={(e)=>{setUserInfo({...userInfo, username:e.target.value})}}
                sx={{width:'200px'}}
                />
            </Box>
            <Box>
                <InputLabel>Password: </InputLabel>
                <TextField
                required
                id="title"
                label="Required"
                onChange={(e)=>{setUserInfo({...userInfo, password:e.target.value})}}
                sx={{width:'200px'}}
                />
            </Box>
            <Button type='submit'>Submit</Button>
        </form>
    )
}

export default LoginPage