import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Main from './pages/Main'




function App() {
  return (
    <Routes >
      <Route path="/" Component={Main} />
    </Routes>
  )
}

export default App
