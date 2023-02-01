import Ball from "../../../public/assets/ball.svg"
import { useState } from "react"
import bayern from "../../../public/assets/assets/bayern.png"
import psg from "../../../public/assets/assets/psg.png"
import liverpool from "../../../public/assets/assets/liverpool.png"
import realmadrid from "../../../public/assets/assets/realmadrid.png"
import leipzig from "../../../public/assets/assets/leipzig.png"
import manchestercity from "../../../public/assets/assets/manchestercity.png"
import borussiadortmund from "../../../public/assets/assets/borussiadortmund.png"
import chelsea from "../../../public/assets/assets/chelsea.png"
import milan from "../../../public/assets/assets/milan.png"
import tottenham from "../../../public/assets/assets/tottenham.png"
import style from "./style.module.css"
import Image from "next/image"

function CardPalpite() {
    const games = [
        { imgTimeCasa: psg, timeCasa: 'PSG', votoCasa: '1', votoFora: '1', imgTimeFora: bayern, timeFora: 'Bayern de Munique', hora: 'Hoje 17:00' },
        { imgTimeCasa: liverpool, timeCasa: 'Liverpool', votoCasa: '2', votoFora: '2', imgTimeFora: realmadrid, timeFora: 'Real Madrid', hora: 'Hoje 13:00' },
        { imgTimeCasa: leipzig, timeCasa: 'RB Leipzig', votoCasa: '1', votoFora: '1', imgTimeFora: manchestercity, timeFora: 'Manchester City', hora: 'Hoje 17:00' },
        { imgTimeCasa: psg, timeCasa: 'PSG', votoCasa: '1', votoFora: '1', imgTimeFora: bayern, timeFora: 'Bayern de Munique', hora: 'Hoje 17:00' },
        { imgTimeCasa: liverpool, timeCasa: 'Liverpool', votoCasa: '2', votoFora: '2', imgTimeFora: realmadrid, timeFora: 'Real Madrid', hora: 'Hoje 13:00' },
        { imgTimeCasa: leipzig, timeCasa: 'RB Leipzig', votoCasa: '1', votoFora: '1', imgTimeFora: manchestercity, timeFora: 'Manchester City', hora: 'Hoje 17:00' },
        { imgTimeCasa: psg, timeCasa: 'PSG', votoCasa: '1', votoFora: '1', imgTimeFora: bayern, timeFora: 'Bayern de Munique', hora: 'Hoje 17:00' },
        { imgTimeCasa: liverpool, timeCasa: 'Liverpool', votoCasa: '2', votoFora: '2', imgTimeFora: realmadrid, timeFora: 'Real Madrid', hora: 'Hoje 13:00' },
        { imgTimeCasa: leipzig, timeCasa: 'RB Leipzig', votoCasa: '1', votoFora: '1', imgTimeFora: manchestercity, timeFora: 'Manchester City', hora: 'Hoje 17:00' },
        { imgTimeCasa: borussiadortmund, timeCasa: 'Borussia Dortmund ', votoCasa: '1', votoFora: '1', imgTimeFora: chelsea, timeFora: 'Chelsea', hora: 'Hoje 13:00' },
        { imgTimeCasa: milan, timeCasa: 'Milan ', votoCasa: '3', votoFora: '3', imgTimeFora: tottenham, timeFora: 'Tottenham Hotspur', hora: 'Hoje 17:00' },
        { imgTimeCasa: psg, timeCasa: 'PSG', votoCasa: '1', votoFora: '1', imgTimeFora: bayern, timeFora: 'Bayern de Munique', hora: 'Hoje 17:00' },
    ]

    const leagues = [
        { nome: 'Premier League', pais: 'Inglaterra' },
        { nome: 'Brasileirão', pais: 'Brasil' },
        { nome: 'Copa do Brasil', pais: 'Brasil' },
        { nome: 'Libertadores', pais: 'America do Sul' },
        { nome: 'Sulamericana', pais: 'America do Sul' },
        { nome: 'Mundial de Clubes', pais: 'Mundo' },
    ]

    const [unique, setUnique] = useState<boolean>(true)
    return (
        <div className={style.bodyPalpite} style={!unique ? { maxWidth: '110rem' } : { width: '110rem' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '1rem 1rem 0rem 1rem', boxSizing: 'border-box' }}>
                <ul className={style.listaLigas}>
                    {
                        leagues.map((liga, index) => (
                            <li key={index} className={style.listaLigaLI}>{liga.nome}</li>
                        ))
                    }
                </ul>
                <div className={style.visaoJogos}>
                    <span>Visualizacao: </span>
                    <svg className={style.uniqueVis} tabIndex={1} onClick={() => setUnique(true)} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z" fill=""></path>
                    </svg>
                    <svg className={style.multiplyVis} tabIndex={2} onClick={() => setUnique(false)} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clipRule="evenodd" fill=""></path>
                    </svg>
                </div>
            </div>
            <ul className={!unique ? style.ulPalpiteMult : style.ulPalpite}>
                {games.map((game, key) => {
                    return (
                        <li key={key} className={!unique ? style.liPalpiteMult : style.liPalpite}>
                            {!unique && <div className={style.titleCard}> <span className={style.titleCardContent}><img src={Ball} alt="" />Campeonato Teste</span> <span>{game.hora}</span></div>}
                            <div className={!unique ? style.contentContainerMult : style.contentContainer}>
                                <span className={style.spanPalpiteTime}>
                                    <Image className={style.imgPalpite} src={game.imgTimeCasa} width={45} height={45} alt="" />
                                    <p className={style.nomeTimeCard}>
                                        {game.timeCasa}
                                    </p>
                                </span>
                                <input className={style.inputPalpite} value={game.votoFora}></input>
                                <div className={style.spanPalpiteX}>
                                    <p>X</p>
                                    {unique && <p className={style.pPalpite}>
                                        {game.hora}
                                    </p>}
                                </div>
                                <input className={style.inputPalpite} value={game.votoFora}></input>
                                <span className={style.spanPalpiteTime}>
                                    <Image className={style.imgPalpite} src={game.imgTimeFora} width={45} height={45} alt="" />
                                    <p className={style.nomeTimeCard}>
                                        {game.timeFora}
                                    </p>
                                </span>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default CardPalpite