import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const User = () => {
    const [users, setUsers] = useState([]);
    const Navigate = useNavigate()

    useEffect(() => {
        const fatchUsers = async () => {
            try {
                const res = await axios.get("http://localhost:5000/get-users");
                setUsers(res.data)
            } catch (error) {
                console.error('Error fatching user', error)
            }
        }
        fatchUsers();
    }, []);


    // Delete User function
    const deleteUser = async (id) => {
        // if(window.confirm("Are you sure you want to delete This user?")){}
        try {
            await axios.delete(`http://localhost:5000/delete-user/${id}`);
            alert("User deleted successfylly");

            // Remove from state
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error("User deleteing error", error);
            alert('Failed to delete user')
        }

    }
    const handleLogout = ()=>{
        localStorage.removeItem("token");
        Navigate('/login')
    }
    
    // const users = [
    //     { id: 1, name: "Yasir", email: "yasir@gmail.com", phone: "+84397534", address: "Lahore" },
    //     { id: 2, name: "Ali", email: "ali@gmail.com", phone: "+923000000", address: "Karachi" },
    //     { id: 3, name: "Ahmed", email: "ahmed@gmail.com", phone: "+923111111", address: "Islamabad" }
    // ];

    return (
        <>
            <Box>
                        <Button sx={{ background: "white", margin: "10px 20px", padding: "15px 20px", color: "blue" }}
                            onClick={(handleLogout)}
                        >
                            Logout
                        </Button>

                <Typography sx={{ textAlign: "center", fontSize: "40px", color: "white", fontWeight: "bold" }}>Users Table</Typography>
            </Box>
            <Box>
                <Box>
                    <Typography>
                        <Button sx={{ background: "white", margin: "10px 20px", padding: "15px 20px", color: "blue" }}
                            onClick={() => Navigate("/new-user")}
                        >
                            Add New User
                        </Button>
                    </Typography>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Phone</TableCell>
                                <TableCell align="center">Address</TableCell>
                                <TableCell align="center" >Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="center">{user.name}</TableCell>
                                    <TableCell align="center">{user.email}</TableCell>
                                    <TableCell align="center">{user.phone}</TableCell>
                                    <TableCell align="center">{user.address}</TableCell>
                                    <TableCell align="center"><Button onClick={() => Navigate(`/update-user/${user.id}`)} sx={{ border: "1px solid blue" }}>Update</Button> <Button onClick={() => deleteUser(user.id)} sx={{ border: "1px solid red", color: "red" }}>Delete</Button></TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

export default User;
