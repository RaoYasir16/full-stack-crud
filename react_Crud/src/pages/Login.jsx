import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {

    const [formData ,setFormData] = useState({
        email:"",
        password:""
    });

    const [errors , setErrors] = useState({});
    const [serverErrors ,  setServerErrors] =useState("")

    const navigate = useNavigate();
    
    const handleChange = (e)=>{
      setFormData({...formData,[e.target.name]:e.target.value})
    }
  
    const validateion = ()=>{
      let temErrors = {}
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if(!formData.email){
        temErrors.email = "Email is required"
      }else if(!emailRegex.test(formData.email)){
        temErrors.email = "Invalid email format";
      }

      if(!formData.password){
        temErrors.password = "Password is required"
      }else if(formData.password < 5){
        temErrors.password = "Password must be at least 6 characters"
      }
      setErrors(temErrors);
      return Object.keys(temErrors).length === 0;
    };

    const handleSubmet = async(e)=>{
      e.preventDefault();

      if(validateion()){
        try {
            const res = await axios.post(`http://localhost:5000/login`,{
            email:formData.email,
            password:formData.password
          });

          localStorage.setItem("token",res.data.token);


          alert("login Successfylly")
          navigate('/')
        } catch (error) {
          console.error(error);
          setServerErrors(error.response?.data?.message || "some Want worng")
          
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
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmet}  noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
            error ={!!errors.email}
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
            error={!!errors.password}
            helperText = {errors.password}
          />

          {serverErrors &&(
            <Typography color="error" sx={{mt:1, textAlign:"center"}}>
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
            Already have't an account?{" "}
            <Link
              component="button"
              variant="body1"
              sx={{
                fontWeight: "bold",
                color: "#1976d2",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
              
              to="/register"
            >
              Register
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
