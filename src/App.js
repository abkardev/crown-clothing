 import Home from './router/home/home.component'
 import {Routes, Route} from 'react-router-dom'
 import Navigation from './router/navigation/navigation.component'

 const Shop = () => {
   return <h1>I am the Shop Page</h1>
 }
const App = () => {
  
  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
      </Route>
    </Routes>
  )
}

export default App;
