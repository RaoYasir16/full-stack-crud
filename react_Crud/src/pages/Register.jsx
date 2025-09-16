import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
const navigate = useNavigate();
const [formData,setFormData] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""

});

const [errors,setErrors] = useState({});
const [serverErrors,setServerErrors] = useState("")

const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
}

const validation = ()=>{
    let temErrors = {}

    // Email validation
    const emailReges = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!formData.email){
        temErrors.email = "Email is require"
    }else if(!emailReges.test(formData.email)){
        temErrors.email = "valid Email is require"
    }

    // Password validateion
    if(!formData.password){
        temErrors.password = "Password is required"
    }else if(formData.password.length < 5){
        temErrors.password ="Password must be at least 6 characters"
    }

    if(!formData.confirmPassword){
        temErrors.confirmPassword = "Confirm Password required"
    }else if(formData.password !== formData.confirmPassword){
        temErrors.confirmPassword = "Password do not match"
    }

    setErrors(temErrors);
    return Object.keys(temErrors).length ===0
}

const handleSubmet = async(e)=>{
e.preventDefault();

if(validation()){
try {
    const res = await axios.post('http://localhost:5000/register',{
      name:formData.name,
      email:formData.email,
      password:formData.password
    })
      // console.log("Form Data======>",formData)
      alert("User Register successfylly");
      navigate("/login")
} catch (error) {
  console.error(error);
  setServerErrors(error.response?.data?.message || "Something went wrong. Try again")
}
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
          Register
        </Typography>

        <Box component="form" onSubmit={handleSubmet}  noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Name"
            name="name"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
            value={formData.name}
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
            label="Password"
            type="password"
            name="password"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
            value={formData.password}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
            value={formData.confirmPassword}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />

          {serverErrors &&(
            <Typography color="error" sx={{mt:1,textAlign:"center"}}>
              {serverErrors}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1.5, fontWeight: "bold" }}
          >
            Submit
          </Button>
          <Typography sx={{ mt: 2, textAlign: "center" }}>
            Already have an account?{" "}
            <Link
              component="button"
              variant="body1"
              sx={{
                fontWeight: "bold",
                color: "#1976d2",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            to="/login"
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
