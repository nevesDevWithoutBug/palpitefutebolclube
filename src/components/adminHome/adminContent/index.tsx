import Jogos from "src/pages/admin/jogos"
import Home from "src/pages/teste"
import style from "./style.module.css"

function ContentComponent() {
    return (
        <div className={style.content}>
            <Home />
            <Jogos />
        </div>
    )
}

export default ContentComponent