import { createTheme } from '@mui/material'
// import Montserrat from './fonts/Montserrat-VariableFont_wght.ttf'

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#b849fc',
      light: '#c681f2ff',
      dark: '#9d31d3',
      darker: '#6f0cad',
      contrastText: '#fff'
    },
    error: {
      main: '#ff4d4d',
      light: '#fa7876ff',
      dark: '#c62828',
      background: '#f8d7da',
      contrastText: '#fff'
    },
    text: {
      primary: '#333'
    },
  },
  typography: {
    fontFamily: [
      'Montserrat',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 900,
      fontSize: '32px',
      color: '#b849fc'
    },
    h2: {
      fontWeight: 800,
      fontSize: '24px',
      my: '10px',
    },
    h3: {
      fontSize: '20px',
      fontWeight: 700
    },
    body1: {
      color: '#333',
    },
    body2: {
      color: '#676767',
      fontSize: '15px',
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#484848',
          cursor: 'pointer',
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
          '&:visited': {
            color: '#6f0cad',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          width: 'auto',
          minHeight: '28px',
          padding: '5px 15px',
          border: 'none',
          boxShadow: 'none',
          transition: 'all 0.1s ease',
          textTransform: 'capitalize',
          lineHeight: 0,
          '&:hover': {
            boxShadow: 'none',
          },

          variants: [
            {
              props: { color: 'error' },
              style: {
                backgroundColor: '#f0f0f0',
                color: '#333',
                '&:hover': {
                  backgroundColor: '#ff4d4d',
                  color: '#fff'
                }
              }
            },
            {
              props: { color: 'secondary' },
              style: {
                backgroundColor: '#f0f0f0',
                color: '#333',
                '&:hover': {
                  backgroundColor: '#808080',
                  color: '#fff'
                }
              }
            }
          ]
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& fieldset': { display: 'none' },
        },
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { margin: 0 },
        input: {
          width: '100%',
          height: '16px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '10px',
          fontSize: '16px',
          cursor: 'text'
        }
      }
    }
  },
});

export default customTheme