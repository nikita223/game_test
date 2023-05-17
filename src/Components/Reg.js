import React from "react";
import { useState, useEffect } from "react";
import { TextField, Typography, Button, Link,  InputAdornment, IconButton, Stepper, Step, StepLabel, Box, StepButton} from '@mui/material';
import {Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, Controller} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from 'react-input-mask';
import * as yup from 'yup';
import "../input.css"
import axios from 'axios';
import { addPositionPropertiesToSections } from "@mui/x-date-pickers/internals";
import { render } from "@testing-library/react";


function Reg(){
   const schema = yup.object().shape({
   /*  name:
      password:
      confrim_password
      email
      Phone
      address 
      dateReg 
      balance
 */
   })
   const {  
      handleSubmit, 
      resetField,
      control,
      setError,
      formState:{
          errors
      },
  } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
          login:"",
          password:""
        },
    });

   const steps = [1, 2, 3]
   const [CurentStep, setCurentStep] = useState(1);
   const onSubmit = async (data) => {

   }
   const getStep = (step) => {
      switch(step){
         case 1: return step1();
         break;
         case 2: return step2();
         break;
         default:return step1();
      }
   }

   const step1 = () => (
      <div>
         <Controller
            name="name"
            type="text"
            control={control}
            render={({field}) => (   
               <TextField
                  {...field}
                  label="First Name"
                  inputRef=""
                  error={!!errors.firstName}
                  helperText={errors?.firstName?.message}
               />
            )
            }
         />
         <Controller
            name="phone"
            type="tel"
            control={control}
            render={({field}) => (  
               <TextField
                  {...field}
                  label="First Name"
                  inputRef=""
                  error={!!errors.firstName}
                  helperText={errors?.firstName?.message}
               />
            )
            }
         />
          <Controller
         name="password"
         type="password"
         control={control}
         render={({field}) => (  
            <TextField
               {...field}
               label="First Name"
               inputRef=""
               error={!!errors.firstName}
               helperText={errors?.firstName?.message}
         />
         )
         }
      />
         <Controller
            name="corrent_password"
            type="password"
            control={control}
            render={({field}) => (  
               <TextField
                  {...field}
                  label="First Name"
                  inputRef=""
                  error={!!errors.firstName}
                  helperText={errors?.firstName?.message}
               />
            )
            }
         />
      </div>   
   )

   const step2 = () => (
      <div>
         <Controller
         name="email"
         type="email"
         control={control}
         render={({field}) => (  
            <TextField
               {...field}
               label="First Name"
               inputRef=""
               error={!!errors.firstName}
               helperText={errors?.firstName?.message}
         />
         )
         }
      />   
      <Controller
         name="address"
         type="text"
         control={control}
         render={({field}) => (  
            <TextField
               {...field}
               label="First Name"
               inputRef=""
               error={!!errors.firstName}
               helperText={errors?.firstName?.message}
         />
         )
         }
      />
      </div>
   )

   const handleStep = (step) => () => {
      setCurentStep(step)
   }
   return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
         <Stepper activeStep={CurentStep} alternativeLabel>
            {steps.map((label, index) => (
               <Step key={index}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                     <StepLabel>{label}</StepLabel>
                  </StepButton>
                  
               </Step>
            ))}
         </Stepper>
      </Box>
      
      <div>
         {getStep()}
      </div> 
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
   ) 
}


export default Reg