
import React from "react";
import { useState, useEffect } from "react";
import { TextField, Typography, Button, Link,  InputAdornment, IconButton} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, Controller} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from 'react-input-mask';
import * as yup from 'yup';
import "../input.css"
import axios from 'axios';

function Login(){
    const [typeLogin, setTypeLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false)
    const phoneRegExp = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    const schema = yup.object().shape({
        login: yup.string().when(['typeLogin'], {
            is:true,
            then: () => yup.string().email("Неверный формат").required("Поле обязательное для заполнения"),
            otherwise: () => yup.string().matches(phoneRegExp, "Неверный формат").required("Поле обязательное для заполнения")
        }),   
        password: yup.string().required("Поле обязательное для заполнения")
      });
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
    const changeValidateLogin = () => {
        resetField("login")
        setTypeLogin((prevLogin) => (prevLogin ? false : true))
    }
    const onSubmit = async (data) => {
        console.log(data)
        try {
            const response = await axios({
                method:"POST",
                url:"http://localhost:80/user/auth",
                data:data,  
                headers:{
                    'Content-Type': 'application/json'    
                }
            }   
            )
            console.log(response)
       //  
          // Validation passed
        } catch (error) {
            console.log(error.message)
            if(error.response.data.error){
                setError(
                    'login',{
                        type:'server',
                        message:'Неверный логин или пароль'
               })
                setError('password', {
                         type:'server',
                        message:'Неверный логин или пароль'
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
      };
    const Mask = React.forwardRef((props, ref) => {    
            return (
              <InputMask
                {...props}
                inputRef={ref}
              />
            );
          });
    return(
        <div className="flex flex-row items-center justify-center flex-auto h-screen flex-shrink-3">
        <form className="h-4/6" onSubmit={handleSubmit(onSubmit)}>  
            <div className="flex flex-col items-center justify-center space-y-2 h-5/6">
                <Typography variant="h4" align="center">
                    Вход в систему
                </Typography>
                    <div className="flex flex-col justify-around pt-7 h-3/6">
                    <div className="h-4/6">
                        <div className="flex flex-row justify-end space-x-3">
                            <Link onClick={changeValidateLogin}
                            underline="none"
                            component="button"
                             sx={{
                                color:"grey",
                                "&:hover":{
                                    color:"#1976d2"
                                },
                            }}     
                            >{typeLogin ? "Войти по телефону" : "Войти по email"}</Link>
                            
                        </div>
                        
                            <Controller
                                required 
                                name="login" 
                                type={typeLogin ? "email" : "tel"} 
                                control={control}
                                defaultValue=""
                                render={ ({ field }) => (
                                    <TextField label={typeLogin ? "email" : "Телефон"}  
                                    {...field}
                                        autoComplete={typeLogin ? "email" : "tel"}
                                        size="medium"    
                                        error={!!errors.login}
                                        helperText={errors.login?.message}
                                        onChange={(e) => field.onChange(e)}   
                                        value={field.value}  
                                        sx={{
                                            width:"300px"
                                        }}     
                                        InputProps={{   
                                            inputComponent: typeLogin ? undefined : Mask,
                                            inputProps:{
                                                mask: '+7 (999) 999-99-99',
                                            }
                                        }
                                        }              
                                    />
                                )
                        }
                            />   
                        
                        </div>
                        <div className="h-3/6">
                        <Controller 
                                name="password" 
                                type="password"
                                control={control}
                                defaultValue=""
                                render={ ({ field }) => (
                                    <TextField label="Пароль"  {...field}
                                        autoComplete="current-password"
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                        onChange={(e) => field.onChange(e)}   
                                        value={field.value} 
                                        type={showPassword ? "text" : "password"}
                                        sx={{
                                            width:"300px"
                                        }}
                                        InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                              <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                onMouseDown={(event) => event.preventDefault()}
                                              >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                              </IconButton>
                                            </InputAdornment>
                                          
                                        }}
                                    />
                                )
                                }
                                />                      
                        </div>
                    </div>
                    <div className="flex flex-row justify-between w-auto space-x-5">
                        <Button type="submit" color="primary" variant="contained">Отправить</Button>
                        <Link href="#">Забыли пароль?</Link>
                    </div>
                        <Link href="reg" 
                        sx={{
                            textDecoration: "none",
                            position: "relative",
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              width: "100%",
                              height: "2px",
                              bottom: 0,
                              left: -100,
                              backgroundColor: "#1976d2",
                              visibility: "hidden",
                              transform: "scaleX(0)",
                              transition: "all 0.3s ease-in-out 0s",
                            },
                            "&:hover::before": {
                              visibility: "visible",
                              transform: "scaleX(1)",
                              left: 0,
                            },
                            
                        }}
                        >
                            Зарегистрироваться
                        </Link>
                    
                </div>
        </form>
        </div>
    )
}

export default Login
