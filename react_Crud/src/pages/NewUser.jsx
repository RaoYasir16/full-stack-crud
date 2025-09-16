import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const NewUser = () => {
    const [formData,setFormData] = useState({
        name:"",
        email:"",
        phone:"",
        address:""
    });
    const [errors,setErrors] = useState({})

    const Navigate = useNavigate();

    const handleChange =(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
        
    };

    const validate =()=>{
        let newError= {};

        if(!formData.name) newError.name = "name is require";
        if(!formData.email) newError.email = "email is require";
        if(!formData.address) newError.address = "address is require";
        if(!formData.phone) newError.phone = "phone is require"

        setErrors(newError);
        return Object.keys(newError).length === 0
    }



    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!validate()) return;
        try {
            await axios.post("http://localhost:5000/add-users",formData)
            alert("User Added successfylly");
            Navigate('/')
        } catch (error) {
            console.error("error adding user",error);
            alert("faild to add user")
            
        }
    }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f5f6fa",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: 400,
          borderRadius: 3,
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", mb: 3, fontWeight: "bold", color: "#1976d2" }}
        >
          Add New User
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Name"
            name="name"
            variant="outlined"
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
            value={formData.email}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Phone"
            type="tel"
            name="phone"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
            value={formData.phone}
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
            value={formData.address}
            error= {!!errors.address}
            helperText={errors.address}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1.5, fontWeight: "bold" }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default NewUser;
