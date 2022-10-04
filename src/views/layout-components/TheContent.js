import React from 'react'
import {
  Outlet,
} from 'react-router-dom'


import TheHeader from './TheHeader'
import TheFooter from './TheFooter'
import ConfirmActionModal from '../component/ConfirmActionModal'



const TheContent = () => {

  return (
    <>
    <ConfirmActionModal/>
      <TheHeader></TheHeader>
      <Outlet></Outlet>
      <TheFooter></TheFooter>
    </>
  )
}

export default React.memo(TheContent)
