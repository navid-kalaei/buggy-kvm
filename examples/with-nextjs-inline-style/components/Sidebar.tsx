import {FC, useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import Drawer from 'rc-drawer'
import SidebarContent from './SidebarContent'
import {convertQueryParamToString} from '../utils/utils'
import {isSidebarStatusShown} from '../dtos/SidebarStatus'
import {useSidebar} from '../hooks/useResponsive'
import SidebarCollapseButton from './SidebarCollapseButton'


const Sidebar: FC = () => {
  const router = useRouter()
  const {
    query: {
      sidebar: sidebarParam,
    },
  } = router

  const shouldOpenSidebar = isSidebarStatusShown(convertQueryParamToString(sidebarParam))

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  const {width: sidebarWidth} = useSidebar()

  useEffect(() => {
    setIsSidebarOpen(shouldOpenSidebar)
  }, [shouldOpenSidebar])

  return (
    <Drawer
      autoFocus={false}
      open={isSidebarOpen}
      placement="left"
      mask={false}
      rootStyle={{
        height: '100vh',
        padding: 0,
        display: 'flex',
        overflowX: 'clip',
        overflowY: 'scroll',
        position: 'absolute',
        zIndex: 500,
        backgroundColor: 'white',
      }}
      getContainer={false}
      width={isSidebarOpen ? sidebarWidth : 0}
    >
      <SidebarCollapseButton/>

      {isSidebarOpen && (
        <SidebarContent/>
      )}
    </Drawer>
  )
}


export default Sidebar
