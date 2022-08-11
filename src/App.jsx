import './index.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home, Login, ProductsDetail, Purchases } from './pages'
import { NavBar, LoadingScreen, ProtectedRoutes } from './components'
import { useSelector } from 'react-redux'
import Footer from './components/Footer'


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
        <Route element={<ProtectedRoutes />}>

          <Route path='/purchases' element={<Purchases />} />

        </Route>
      </Routes>
      <Footer />
    </HashRouter>
  )
}

export default App
