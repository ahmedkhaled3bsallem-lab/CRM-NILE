import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Alert,
  Fade,
} from "@mui/material";

import {
  LocalHospital,
  Person,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [remember, setRemember] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const saved =
      localStorage.getItem(
        "remember_username"
      );

    if (saved) {
      setUsername(saved);
      setRemember(true);
    }
  }, []);

  async function handleLogin(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response =
        await api.post(
          "/auth/login",
          {
            username,
            password,
          }
        );

      login(response.data.access_token);

      if (remember) {
        localStorage.setItem(
          "remember_username",
          username
        );
      } else {
        localStorage.removeItem(
          "remember_username"
        );
      }

      navigate("/");
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ??
          "Invalid username or password"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg,#0B4FA2,#1976D2,#42A5F5)",
      }}
    >
      {/* Floating Background */}
      <motion.div
        animate={{
          x: [0, 25, 0],
          y: [0, -35, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        style={{
          position: "absolute",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background:
            "rgba(255,255,255,.08)",
          top: -120,
          left: -120,
          filter: "blur(10px)",
        }}
      />

      <motion.div
        animate={{
          x: [0, -25, 0],
          y: [0, 35, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        style={{
          position: "absolute",
          width: 260,
          height: 260,
          borderRadius: "50%",
          background:
            "rgba(255,255,255,.06)",
          bottom: -70,
          right: -70,
          filter: "blur(10px)",
        }}
      />

      <motion.div
        initial={{
          opacity: 0,
          scale: .9,
          y: 50,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: .7,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: 460,
            borderRadius: "28px",
            p: 5,

            background:
              "rgba(255,255,255,.15)",

            backdropFilter:
              "blur(30px)",

            WebkitBackdropFilter:
              "blur(30px)",

            border:
              "1px solid rgba(255,255,255,.25)",

            boxShadow:
              "0 25px 70px rgba(0,0,0,.35)",

            overflow: "hidden",
            position: "relative",
          }}
        ><Box
  sx={{
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: "50%",
    background: "rgba(255,255,255,.08)",
    filter: "blur(80px)",
    top: -100,
    right: -80,
  }}
/>

<Box
  display="flex"
  flexDirection="column"
  alignItems="center"
  mb={4}
>
  <motion.div
    animate={{
      scale: [1, 1.08, 1],
      rotate: [0, 6, -6, 0],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
    }}
  >
    <Box
      sx={{
        width: 105,
        height: 105,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        background:
          "linear-gradient(135deg,#1565C0,#42A5F5)",

        boxShadow:
          "0 0 35px rgba(33,150,243,.55)",
      }}
    >
      <LocalHospital
        sx={{
          fontSize: 58,
          color: "#fff",
        }}
      />
    </Box>
  </motion.div>

  <Typography
    mt={3}
    variant="h4"
    fontWeight={700}
    color="#fff"
  >
    Nile Pharma CRM
  </Typography>

  <Typography
    mt={1}
    sx={{
      color: "rgba(255,255,255,.85)",
      fontSize: 15,
      letterSpacing: .5,
    }}
  >
    Customer Relationship Management
  </Typography>
</Box>

<Fade in={!!error}>
  <Box mb={2}>
    {error && (
      <Alert severity="error">
        {error}
      </Alert>
    )}
  </Box>
</Fade>

<form onSubmit={handleLogin}>

<TextField
  fullWidth
  margin="normal"
  label="Username"
  value={username}
  disabled={loading}
  onChange={(e)=>
    setUsername(e.target.value)
  }
  sx={{
    "& .MuiOutlinedInput-root":{

      borderRadius:"16px",

      background:
      "rgba(255,255,255,.08)",

      backdropFilter:"blur(10px)",

      "& fieldset":{
        borderColor:
        "rgba(255,255,255,.30)",
      },

      "&:hover fieldset":{
        borderColor:"#90CAF9",
      },

      "&.Mui-focused fieldset":{
        borderColor:"#42A5F5",
        borderWidth:"2px",
      }

    },

    "& input":{
      color:"#fff",
    },

    "& label":{
      color:"rgba(255,255,255,.75)",
    },

    "& .MuiSvgIcon-root":{
      color:"#fff",
    },
  }}
  InputProps={{
    startAdornment:(
      <InputAdornment position="start">
        <Person/>
      </InputAdornment>
    )
  }}
/>

<TextField
  fullWidth
  margin="normal"
  label="Password"
  value={password}
  disabled={loading}
  type={
    showPassword
      ? "text"
      : "password"
  }
  onChange={(e)=>
    setPassword(e.target.value)
  }
  sx={{
    "& .MuiOutlinedInput-root":{

      borderRadius:"16px",

      background:
      "rgba(255,255,255,.08)",

      backdropFilter:"blur(10px)",

      "& fieldset":{
        borderColor:
        "rgba(255,255,255,.30)",
      },

      "&:hover fieldset":{
        borderColor:"#90CAF9",
      },

      "&.Mui-focused fieldset":{
        borderColor:"#42A5F5",
        borderWidth:"2px",
      }

    },

    "& input":{
      color:"#fff",
    },

    "& label":{
      color:"rgba(255,255,255,.75)",
    },

    "& .MuiSvgIcon-root":{
      color:"#fff",
    },
  }}
  InputProps={{
    startAdornment:(
      <InputAdornment position="start">
        <Lock/>
      </InputAdornment>
    ),

    endAdornment:(
      <InputAdornment position="end">
        <IconButton
          onClick={()=>
            setShowPassword(
              !showPassword
            )
          }
        >
          {
            showPassword
              ? <VisibilityOff/>
              : <Visibility/>
          }
        </IconButton>
      </InputAdornment>
    )
  }}
/><Box
  display="flex"
  justifyContent="space-between"
  alignItems="center"
  mt={2}
  mb={3}
>
  <FormControlLabel
    control={
      <Checkbox
        checked={remember}
        onChange={(e) =>
          setRemember(e.target.checked)
        }
        sx={{
          color: "rgba(255,255,255,.8)",

          "&.Mui-checked": {
            color: "#fff",
          },
        }}
      />
    }
    label={
      <Typography
        sx={{
          color: "#fff",
          fontSize: 14,
        }}
      >
        Remember Me
      </Typography>
    }
  />

  <Typography
    sx={{
      color: "#fff",
      cursor: "pointer",
      fontSize: 14,
      transition: ".3s",

      "&:hover": {
        color: "#90CAF9",
      },
    }}
  >
    Forgot Password?
  </Typography>
</Box>

<motion.div
  whileHover={{
    scale: 1.03,
  }}
  whileTap={{
    scale: .98,
  }}
>
  <Button
    fullWidth
    type="submit"
    variant="contained"
    disabled={loading}
    sx={{
      mt: 1,
      height: 56,

      borderRadius: "18px",

      fontSize: 18,

      fontWeight: 700,

      textTransform: "none",

      background:
        "linear-gradient(90deg,#1565C0,#42A5F5)",

      boxShadow:
        "0 12px 30px rgba(33,150,243,.45)",

      "&:hover": {
        background:
          "linear-gradient(90deg,#1976D2,#64B5F6)",

        boxShadow:
          "0 18px 45px rgba(33,150,243,.55)",
      },
    }}
  >
    {loading ? (
      <>
        <CircularProgress
          size={22}
          color="inherit"
          sx={{ mr: 1 }}
        />
        Signing In...
      </>
    ) : (
      "Sign In"
    )}
  </Button>
</motion.div>

<Typography
  textAlign="center"
  mt={4}
  sx={{
    color: "rgba(255,255,255,.75)",
    fontSize: 13,
    letterSpacing: 1,
  }}
>
  © 2026 Nile Pharma CRM
</Typography>

</form>

</Paper>

</motion.div>

</Box>  );
}