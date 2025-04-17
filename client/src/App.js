import {Routes,Route} from 'react-router-dom'
import Drawer from "./Pages/DashboardDrawer";
import CameraPlayer from './Pages/Home';
import LoginPage from './Pages/Login';
import RegistrationPage from './Pages/Signup';
import UserProfile from './Components/UserProfile';
import AddCamera from './Components/AddCamera';
import EditCamera from './Components/EditCamera';
import ImageDisplay from './Components/ImageDisplay';
import CameraManager from './Pages/CameraManager';
import OnvifCamera from './Components/OnvifCamera';
function App() {
  return (
    <Routes>
    <Route path='/home' element={<CameraPlayer/>} /> 
    <Route index path='/' element={<LoginPage/>}/>
    <Route path='/tools' element={<OnvifCamera/>}/>
    <Route path='/camera-manager' element={<CameraManager/>}/>
    <Route path='/signup' element={<RegistrationPage/>}/>
    <Route path='/edit-camera/:camera_id' element={<EditCamera/>}/>
    <Route path='/add-camera' element={<AddCamera/>}></Route>
    <Route path='/user' element={<UserProfile/>}/>
    <Route path='/get-image/:id' element={<ImageDisplay/>}/>
    <Route path='/dashboard' element={<Drawer/>} />
    </Routes>
  );
}

export default App;
