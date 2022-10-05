import Container from '@mui/material/Container';
import AppNavbar from './components/AppBar';
import AppBody from './components/AppBody';

import './App.css';

function App() {
  return (
    <Container>
      <AppNavbar />
      <AppBody />
    </Container>
  );
  // return <Button variant="contained">Hello World</Button>;
}

export default App;
