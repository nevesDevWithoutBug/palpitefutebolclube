import { useState } from "react"
import ContentComponent from "./adminContent"
import HeaderComponent from "./adminHeader"
import MenuComponent from "./adminMenu"
import style from "./style.module.css"

function AdminHomeComponent() {
    const [menuSelected, setMenuSelected] = useState<string>('')
    return (
        <div className={style.homeAdmin}>
            <HeaderComponent />
            <MenuComponent setMenu={setMenuSelected} />
            <ContentComponent page={menuSelected} />
        </div>
    )
}

export default AdminHomeComponent