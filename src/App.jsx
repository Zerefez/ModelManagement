import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Dashboard from './components/Dashboard'
import Jobs from './components/Jobs'
import Layout from './components/Layout'
import AllExpenses from './components/manager/AllExpenses'
import CreateJob from './components/manager/CreateJob'
import CreateManager from './components/manager/CreateManager'
import CreateModel from './components/manager/CreateModel'
import EditManager from './components/manager/EditManager'
import EditModel from './components/manager/EditModel'
import Managers from './components/Managers'
import ModelExpenses from './components/ModelExpenses'
import Models from './components/Models'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={
        !isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />
      } />
      
      {/* Layout wrapper for all protected routes */}
      <Route element={<Layout />}>
        {/* Basic protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<Jobs />} />
          <Route path="/jobs/:id/edit" element={<Navigate to="/jobs/:id" replace />} />
          {/* Redirect old model jobs route to consolidated jobs view */}
          <Route path="/models/:id/jobs" element={<Navigate to="/jobs" replace />} />
          <Route path="/models/:id/expenses" element={<ModelExpenses />} />
        </Route>
        
        {/* Routes that require manager role */}
        <Route element={<ProtectedRoute requireManager={true} />}>
          {/* Models routes */}
          <Route path="/models" element={<Models />} />
          <Route path="/models/:id" element={<Models />} />
          <Route path="/models/:id/edit" element={<EditModel />} />
          
          {/* Managers routes */}
          <Route path="/managers" element={<Managers />} />
          <Route path="/managers/:id" element={<Managers />} />
          <Route path="/managers/:id/edit" element={<EditManager />} />
          
          {/* Expenses routes for managers */}
          <Route path="/expenses" element={<AllExpenses />} />
          
          {/* Creation routes */}
          <Route path="/create-job" element={<CreateJob />} />
          <Route path="/create-model" element={<CreateModel />} />
          <Route path="/create-manager" element={<CreateManager />} />
        </Route>
      </Route>
      
      {/* Redirect to login by default */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
    </Routes>
  )
}

export default App
