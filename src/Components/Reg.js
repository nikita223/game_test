import React from "react";
import { useState, useEffect } from "react";
import { TextField, Typography, Button, Link,  InputAdornment, IconButton, Stepper, Step, StepLabel, Box, StepButton} from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import {Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, Controller} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from 'react-input-mask';
import * as yup from 'yup';
import "../input.css"
import axios from 'axios';
import 'react-dadata/dist/react-dadata.css';
import Password from "./Password.js";
import { instance } from "./config";

function Reg(){
   const phoneRegExp = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
   
   const schema = yup.object().shape({
      name: yup.string().required("Обязательное поле")
         .trim("Неверный формат")
         .max(255, "Превышено максимально допустимое число символов")
         .matches(/^[a-zA-Zа-яА-Я]+$/, 'Имя должно содержать только буквы'),
      password: yup.string().required("Обязательное поле")
         .min(8, "Минимум 8 символов")
         .max(50, "Максимум 50 символов")
         .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])/, 'Пароль должен содержать и цифры и буквы'),
      confrimPassword: yup.string().required('Подтвердите пароль')
         .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
      email:yup.string().email("Неверный формат").required("Поле обязательное для заполнения"),
      phone:yup.string().matches(phoneRegExp, "Неверный формат").required("Поле обязательное для заполнения")
     // address:
   })
   const {  
      handleSubmit, 
      resetField,
      control,
      setError,
      formState:{
          errors,
          isDirty
      },
  } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
          name:"",
          password:"",
          email:"",
          phone:""
        },
    mode:"onChange"
    });
   const steps = [1, 2]
   const [ComplitedSteps, setComplitedSteps] = useState({});
   const [CurentStep, setCurentStep] = useState(0)
   const [errorStep, setErrorStep] = useState({})
   const onSubmit = async (data) => {
      delete data.confrimPassword
      delete data.a
      console.log(data)
        try {
            
            const response = instance.post("user/reg", data)
            console.log(response)
      
        } 
        catch (error) {
            console.log(error.message)
            if(!error.response){
               return
            }
            if(error.response.data.error === ""){
               setError(
                  'name', {
                     type:'server',
                     message:''
            })
               
            if(error.response.data.error === ""){
               setError(
                  'phone', {
                     type:'server',
                     message:'Пользователь с таким номером уже зарегистрирован'
            })
            
               if(error.response.data.error === ""){
                  setError(
                     'email', {
                        type:'server',
                        message:'Пользователь с такой почтой уже зарегистрирован'
               })
            }
            else{
                setError(
                    'login', {
                        type: 'network',
                        message: 'Ошибка при отправке данных'
                    }
                  );
            }
          // Validation failed
          console.error(error);
        }
      }
   }
}
   
   const handleStep = (step) => () => {
      CompletionStep()
      ValidationSteps(step)
      setCurentStep(step)
   }
   
   const ValidationSteps = (step) => {
      let newErrorStep = {...errorStep}
      for(let i = CurentStep; i <= steps.length - 1; i++){
         if(i < step && ComplitedSteps[i] !== true){  
            newErrorStep[i] = true
          }
         else{
               newErrorStep[i] = false
            }
         }
         setErrorStep(newErrorStep)
      }

   const CompletionStep = () => {
         setComplitedSteps((prevComplitedSteps) => {
            let newComplitedSteps = {...prevComplitedSteps}
            newComplitedSteps[CurentStep] = Object.keys(errors).length === 0 && isDirty
            return newComplitedSteps
         }) 
      } 
      
   const Mask = React.forwardRef((props, ref) => {    
      return (
        <InputMask
          {...props}
          inputRef={ref}
        />
      );
    });
    
   const step1 = () => (
      <div className="flex flex-col justify-between h-1/2">
         <div className="flex flex-col justify-start">
            <div className="flex flex-col h-24">
               <Controller 
                  required 
                  name="name"
                  type="text"
                  defaultValue=""
                  control={control}
                  render={({field}) => (   
                     <TextField
                        {...field}
                        onChange={(e) => field.onChange(e)}   
                        value={field.value}  
                        label="Имя"
                        error={!!errors.Name}
                        helperText={errors?.Name?.message}
                     />
                  )
                   }
               />
            </div>
            <div className="flex flex-col h-24">
               <Controller
                  required 
                  name="phone"
                  type="tel"
                  defaultValue=""
                  control={control}
                  render={({field}) => (  
                     <TextField
                        {...field}
                        autoComplete="tel"
                        onChange={(e) => field.onChange(e)}   
                        value={field.value}  
                        label="Телефон"
                     //  inputRef=""
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                        InputProps={{
                           inputComponent: Mask,
                           inputProps:{
                              mask: '+7 (999) 999-99-99',
                           }
                        }}
                     />
                  )
                  }
               />
            </div>
            <div className="flex flex-col h-24">
               <Password control={control} name="password" error={errors} defaultValue=""/>
            </div>
            <div className="flex flex-col h-24">
               <Password control={control} name="confrimPassword" error={errors} defaultValue=""/>
            </div>
         </div>
         <div className="flex flex-row justify-between w-84">
         <Button className="w-28" type="button" variant="contained" color="primary"
            onClick={handleStep(CurentStep - 1)}
            disabled={true}
         >
            Назад
         </Button>
         <Button className="w-28" variant="contained" color="primary"
            type="button"
            onClick={handleStep(CurentStep + 1)}  
         >
            Далее
         </Button> 
      </div>  
      </div>
   )

   const step2 = () => (
   <div className="flex flex-col justify-between h-96">
      <div className="flex flex-col justify-start">
         <div className="flex flex-col h-24">
         <Controller
         required 
         name="email"
         type="email"
         control={control}
         defaultValue=""
         render={({field}) => (  
            <TextField
               {...field}
               label="email"
            //   inputRef=""
               error={!!errors.email}
               helperText={errors?.email?.message}
         />
         )
         }
      /> 
      </div>
      <div className="flex flex-col h-24">
      <Controller
         name="a"
         type="text"
         control={control}
         defaultValue=""
         render={({field}) => (  
            <TextField
               {...field}
               label="Адрес"
             //  inputRef=""
               error={!!errors.firstName}
               helperText={errors?.firstName?.message}
         />
         )
         }
      />

      </div>  
      </div>
      <div className="flex flex-row justify-between w-84">
         <Button className="w-28" type="button" variant="contained" color="primary"
            onClick={handleStep(CurentStep - 1)}
         >
            Назад
         </Button>
         <Button className="w-28" variant="contained" color="primary"
            type="submit" 
         >
            Отправить
         </Button> 
      </div>  
   </div>
   )

   
   return(
   <div className="flex flex-col items-center h-screen overflow-hidden ">
      <div className="w-2/3 py-24">
         <Box>
         <Stepper nonLinear activeStep={CurentStep} alternativeLabel>
            {steps.map((label, index) => (
               <Step key={index} completed={ComplitedSteps[index]}>
                  <StepButton onClick={handleStep(index)} color="inherit">
                     <StepLabel error={errorStep[index]}>{"Шаг " + label}</StepLabel>
                  </StepButton>
               </Step>
            ))}
         </Stepper>
         </Box>
      </div>
   <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-1/2 h-3/5">
      <div className="flex flex-col h-full w-96">
         <Typography className="pb-10" variant="h4" align="center">Регистрация</Typography>
         <TabContext value={`${CurentStep}`}>
            <TabPanel className="flex flex-col h-full" value="0" index={0}>  
               {step1()}
            </TabPanel>
            <TabPanel value="1" index={1} className="flex flex-col h-full">
               {step2()}
            </TabPanel>
         </TabContext>  
      </div>    
    </form>
    </div>
   ) 
}


export default Reg