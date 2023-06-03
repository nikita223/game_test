import { Visibility, VisibilityOff } from "@mui/icons-material"
import { IconButton, InputAdornment, TextField } from "@mui/material"
import { useState } from "react"
import { useForm, Controller} from "react-hook-form";


function Password(fields){
    const [hiddenPassword, setHiddenPassword] = useState(false)
    return(
        <Controller
            control = {fields.control}
            name = {fields.name}
            required 
            defaultValue=""      
            render={({field}) => (  
                <TextField
                {...field}
                sx={fields.sx}
                error={!!fields.error.password}
                helperText={fields.error.password?.message}
                label="Пароль"
                onChange={(e) => field.onChange(e)}
                value={field.value} 
                type={hiddenPassword ? "text" : "password"}
                InputProps={{
                    endAdornment:
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setHiddenPassword(prev => (!prev))}
                                onMouseDown={(event) => event.preventDefault()}
                            >
                                {hiddenPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                }}
         />
     )
     }
  />
        
    )
   
}

export default Password