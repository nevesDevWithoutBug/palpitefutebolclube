import RodadaComponent from "../adminRodada"
import JogosComponent from "../adminJogos"
import style from "./style.module.css"
import CampeonatoCamponent from "../adminCampeonato"
import NewsComponent from "../adminNews"

function ContentComponent(props: any) {
    const page = props.page

    return (
        <div className={style.content}>
            {page === 'user' && <JogosComponent />}
            {page === 'jogo' && <RodadaComponent />}
            {page === 'campeonato' && <CampeonatoCamponent />}
            {page === 'news' && <NewsComponent />}
        </div>
    )
}

export default ContentComponent