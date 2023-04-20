import { forwardRef } from 'react'
import {TextField} from '@mui/material'


const phoneInput = (props, ref) => {

  return (

    <TextField
      {...props}
      inputRef={ref}
      fullWidth
      size='small'
      label='Mobile Number'
      variant='outlined'
      name='phone'
    />
  )
}
export default forwardRef(phoneInput)