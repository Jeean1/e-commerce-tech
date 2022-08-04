import './index.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home, Login, ProductsDetail, Purchases } from './pages'
import { NavBar, LoadingScreen } from './components'
import { useSelector } from 'react-redux'


function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <HashRouter>
      <NavBar fixed='top' />
      {isLoading && <LoadingScreen />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:id' element={<ProductsDetail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/purchases' element={<Purchases />} />
      </Routes>
    </HashRouter>
  )
}

export default App
