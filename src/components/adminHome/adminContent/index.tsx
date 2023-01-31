import Usuarios from "src/pages/admin/usuarios"
import JogoComponent from "../adminJogos"
import style from "./style.module.css"

function ContentComponent(props: any) {
    const page = props.page

    return (
        <div className={style.content}>
            {page === 'user' && <Usuarios />}
            {page === 'jogo' && <JogoComponent />}
        </div>
    )
}

export default ContentComponent