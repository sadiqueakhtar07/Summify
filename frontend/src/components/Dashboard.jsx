
import Sidebar from './Sidebar'
import WindowChat from './WindowChat'
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Sidebar/>      
      <WindowChat/>
    </div>
  )
}

export default Dashboard
