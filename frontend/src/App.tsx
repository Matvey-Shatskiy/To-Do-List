import { Container, Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import TodoList from './components/main';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Box>
          <TodoList />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;