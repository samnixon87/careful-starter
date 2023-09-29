import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios'
import Nav from '../Header';
import NameSelector from '../../../login/components/NameSelector';
import CareRecord from '../../../dashboard/components/CareRecord';
import NotFound from '../NotFound';
import { GlobalStyle } from '../../styles'
import { ICaregiver, ICareRecipient } from '../../interfaces'

export const App = () => {

  const [careRecipients, setCareRecipients] = useState<ICareRecipient | null>(null)
  const [caregivers, setCaregivers] = useState<ICaregiver | null>(null)
  const [careRecipientName, setCareRecipientName] = useState('')
  const [id, setId] = useState(localStorage.getItem('id') || '')

  // Fix for weird styled-components vs react bug that still isn't resolved: https://github.com/styled-components/styled-components/issues/3738
  const GlobalStyleProxy: any = GlobalStyle;

  useEffect(() => {
    loadCareRecipients();
  },[])

  const loadCareRecipients = async () => {
    const resCareRecipients = await axios.get('http://localhost:8000/care-recipient/');
    const resCaregivers = await axios.get('http://localhost:8000/caregiver/');
    setCareRecipients(resCareRecipients.data.care_recipient)
    setCaregivers(resCaregivers.data.caregiver)
  }

  return (
    <>
      <GlobalStyleProxy />
      <Nav/>
      <Routes>
        <Route path='/' element={<NameSelector
                                  careRecipients={careRecipients!}
                                  setId={setId}
                                  careRecipientName={careRecipientName}
                                  setCareRecipientName={setCareRecipientName}
                                />} />
        <Route path='events/:name' element={<CareRecord
                                              id={id}
                                              caregivers ={caregivers!}
                                              careRecipientName={careRecipientName}
                                              setCareRecipientName={setCareRecipientName}
                                            />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
