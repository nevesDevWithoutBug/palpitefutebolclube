import { useState } from "react"
import ContentComponent from "./adminContent"
import HeaderComponent from "./adminHeader"
import MenuComponent from "./adminMenu"
import style from "./style.module.css"

function AdminHomeComponent() {
    const [menuSelected, setMenuSelected] = useState<string>('')
    const [menuStatus, setMenuStatus] = useState<boolean>(true)
    return (
        <div className={menuStatus ? style.homeAdmin : style.homeAdminHideMenu}>
            <HeaderComponent />
            <svg fill="white" onClick={() => setMenuStatus(!menuStatus)} className={ menuStatus ? style.buttonMenu : style.buttonMenuHide } viewBox="0 0 384 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
            {/* <button onClick={() => setMenuStatus(!menuStatus)} className={ menuStatus ? style.buttonMenu : style.buttonMenuHide }>{
            menuStatus ? 
            'hide'
            : 
            'show' 
            }</button> */}
            {menuStatus && <MenuComponent setMenu={setMenuSelected} />}
            <ContentComponent page={menuSelected} />
        </div>
    )
}

export default AdminHomeComponent