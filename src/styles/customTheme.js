import { createTheme } from '@mui/material'
import Montserrat from './fonts/Montserrat-VariableFont_wght.ttf'

const customTheme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

export default customTheme