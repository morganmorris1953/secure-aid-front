import UserContext from '../Contexts/UserContext'
import { useNavigate } from 'react-router-dom'



const useSendHome = () => {
  let navigate = useNavigate()
  navigate('/')
}

let exportItems = {
  useSendHome,
}

export default exportItems