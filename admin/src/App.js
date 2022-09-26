import Ordenes from "./components/pages/Ordenes"
import Menu from "./components/pages/Menu"
import NuevoPlato from "./components/pages/NuevoPlato"
import Sidebar from "./components/ui/Sidebar"


import firebase, {FirebaseContext} from './firebaseData'
import { Routes, Route } from "react-router-dom"


export default function App() {
  return (
    <FirebaseContext.Provider value={{firebase}}>

    <div className="md:flex min-h-screen">
      <Sidebar/>
      <div className="md:w-3/5 xl:w-4/5 p-5 bg-gray-600">

      <Routes>
        <Route path="/" element={<Ordenes/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/nuevoplato" element={<NuevoPlato/>} />
      </Routes>

      </div>

    </div>

    </FirebaseContext.Provider>
  )
}