import TextField from '@mui/material/TextField';



export default function MultilineTextFields({label, value, name, onChange, onBlur, error, helperText}) {
  return (
        <TextField
          id="outlined-multiline-static"
          label={label}
          sx={{'width': '100%'}} 
          multiline
          rows={4}
          value={value} 
          name = {name}
          onChange = {onChange}
          onBlur = {onBlur}
          error= {error}
          helperText= {helperText}
        />
  );
}