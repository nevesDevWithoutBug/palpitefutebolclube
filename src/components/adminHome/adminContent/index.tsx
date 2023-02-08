import RodadaComponent from "../adminRodada"
import JogosComponent from "../adminJogos"
import style from "./style.module.css"

function ContentComponent(props: any) {
    const page = props.page

    return (
        <div className={style.content}>
            {page === 'user' && <JogosComponent />}
            {page === 'jogo' && <RodadaComponent />}
        </div>
    )
}

export default ContentComponent