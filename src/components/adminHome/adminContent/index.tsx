import Jogos from "src/pages/admin/jogos"
import Usuarios from "src/pages/admin/usuarios"
import style from "./style.module.css"

function ContentComponent(props: any) {
    const page = props.page

    return (
        <div className={style.content}>
            {page === 'user' && <Usuarios />}
            {page === 'jogo' && <Jogos />}
        </div>
    )
}

export default ContentComponent