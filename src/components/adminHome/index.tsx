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
            <div onClick={() => setMenuStatus(!menuStatus)} className={style.divIconMenu}>
                <svg fill="#e4e4e4" className={ style.buttonMenu } viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
            </div>
            {menuStatus && <MenuComponent setMenu={setMenuSelected} />}
            <ContentComponent page={menuSelected} />
        </div>
    )
}

export default AdminHomeComponent