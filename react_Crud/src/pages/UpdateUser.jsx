import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    phone:"",
    address:""
  });

  const handleChanges =(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSubmit =async(e)=>{
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/update-user/${id}`,formData);
      alert('User updated successfylly');
      navigate('/')
    } catch (error) {
      console.error("Error updating user",error);
      alert("Faild to update user");
    }
  }
  

  useEffect(()=>{
    const fatchUser = async()=>{
      try {
        const res = await axios.get(`http://localhost:5000/get-user/${id}`);
        setFormData(res.data)
        
      } catch (error) {
        console.error("Error fatching user",error)
      }
    }
    fatchUser();
  },[id])

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Paper elevation={4} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" sx={{ textAlign: "center", mb: 3, fontWeight: "bold", color: "#1976d2" }}>
          Update User
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="normal"
            value={formData.name}
            onChange={handleChanges}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            margin="normal"
            value={formData.email}
            onChange={handleChanges}
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            margin="normal"
            value={formData.phone}
            onChange={handleChanges}
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            margin="normal"
            value={formData.address}
            onChange={handleChanges}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Update
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UpdateUser;
