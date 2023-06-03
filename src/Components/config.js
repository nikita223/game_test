import * as yup from 'yup';
import axios from 'axios';
import React from "react";
import InputMask from 'react-input-mask';
import { Visibility, VisibilityOff} from '@mui/icons-material';
import {InputAdornment, IconButton} from '@mui/material';
import {create} from 'zustand';

export const phoneRegExp = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

export const instance = axios.create({
    baseURL: 'https:localhost:80',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
  });

export const Mask = React.forwardRef((props, ref) => {    
    return (
      <InputMask
        {...props}
        inputRef = {ref}
      />
    );
  });


 

