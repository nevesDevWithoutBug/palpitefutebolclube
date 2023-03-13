import RodadaComponent from "../adminRodada"
import JogosComponent from "../adminJogos"
import style from "./style.module.css"
import CampeonatoCamponent from "../adminCampeonato"
import NewsComponent from "../adminNews"
import AdminHomeInfoComponent from "../adminHomeInfo"
import AdminUserComponent from "../adminUser"

function ContentComponent(props: any) {
    const page = props.page

    return (
        <div className={style.content}>
            {page === 'home' && <AdminHomeInfoComponent />}
            {page === 'jogo' && <JogosComponent />}
            {page === 'rodada' && <RodadaComponent />}
            {page === 'campeonato' && <CampeonatoCamponent />}
            {page === 'news' && <NewsComponent />}
            {page === 'user' && <AdminUserComponent />}
        </div>
    )
}

export default ContentComponent