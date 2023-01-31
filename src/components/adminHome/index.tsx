import ContentComponent from "./adminContent"
import HeaderComponent from "./adminHeader"
import MenuComponent from "./adminMenu"
import style from "./style.module.css"

function AdminHomeComponent() {
    return (
        <div className={style.homeAdmin}>
            <HeaderComponent />
            <MenuComponent />
            <ContentComponent />
        </div>
    )
}

export default AdminHomeComponent