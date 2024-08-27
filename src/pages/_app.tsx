import { AppProps } from 'next/app';
import { AuthConsumer, AuthProvider } from 'src/contexts/auth/jwt-context';
import { ThemeProvider } from '@mui/material/styles';
import {createTheme} from 'src/theme/index';
import {initialSettings} from '../contexts/setting-context';
import {SnackbarProvider} from 'notistack';

function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SnackbarProvider>
      <AuthProvider>
        <AuthConsumer>
            {(auth) => {
                // console.log(auth)
                const showScreen = auth.isInitialized;
                // console.log(auth)
                const theme = createTheme(initialSettings);
                if(!showScreen) {
                  return <h1> loaaa</h1>
                }else {
                  return (
                    <ThemeProvider theme={theme} >
                      {getLayout(<Component {...pageProps} />)}
                    </ThemeProvider>
                  )
                }
              }
            }
        </AuthConsumer>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
