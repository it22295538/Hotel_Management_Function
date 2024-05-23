
import NavBar from './components/NavBar';
import CusRegister from './components/CusRegisters';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import AllCustomers from './components/AllCustomers';
import './App.css';
import StaffRegister from './components/StaffRegister';
import AllStaff from './components/AllStaff';
import Login from './components/Login';
import GuestRegistrationForm from './components/GuestReg';
import GuestProfiles from './components/displayGuest';
import Footer from './components/Footer';
import PasswordReset from './components/ForgetPwd';
import CustomerProfile from './components/cusProfile';
import StaffProfile from './components/Staffpro';
import GuestProfileSummary from './components/guestReport'
import GeneratePDFReport from './components/ReportCus'


function App() {
    
  return (
    
    <Router>
    <div>
      <NavBar />
      <Routes>
        
        <Route path="/Hotel/Customer/register"  element={<CusRegister/>} />
        <Route path="/Hotel/Customer/displayAll"  element={<AllCustomers/>}/>
        <Route path="/Hotel/Staff/register"  element={<StaffRegister/>}/>
        <Route path="/Hotel/Staff/displayAll"  element={<AllStaff/>}/>
        <Route path="/Hotel/User/login"  element={<Login/>}/>
        <Route path="/Hotel/Guest/register"  element={<GuestRegistrationForm/>}/>
        <Route path="/Hotel/Guest/displayAll"  element={<GuestProfiles/>}/>
        <Route path="/Hotel/passwordReset"  element={<PasswordReset/>}/>
        <Route path="/Hotel/cusProfile/:userId"  element={<CustomerProfile/>} />
        <Route path="/Hotel/StaffProfile/:userId"  element={<StaffProfile/>} />
        <Route path="/Hotel/Guest/summery"  element={<GuestProfileSummary/>} />
        <Route path="/Hotel/Customer/summery"  element={<GeneratePDFReport/>} />
        
      </Routes>
      <Footer/>
    </div>
  </Router>
  
   
  );
}
    
export default App;

