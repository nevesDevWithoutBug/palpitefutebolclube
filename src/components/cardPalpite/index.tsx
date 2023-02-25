import Ball from "../../../public/assets/ball.svg"
import { useEffect, useState } from "react"
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
import CardSkeleton from "../skeleton"
import Api from "src/providers/http/api"

function CardPalpite() {

    const [games, setGames] = useState<any>([])
    const [teams, setTeams] = useState<any>([])
    const [championships, setChampionships] = useState<any>([])
    const [gamesFiltered, setGamesFiltered] = useState<any>([])
    

    useEffect(() => {
        (async () => {
        const [teams, championships, games] = await Promise.all([
        Api.get('/api/auth/team'),
        Api.get('/api/auth/championship'),
        Api.get('/api/auth/game'),
        ]);
        setGames(games); setChampionships(championships); setTeams(teams);
        console.log('campeonatos', championships, 'games', games);
        })()
    }, [])

    const setGamesExhibition = (id: any) => {
        setGamesFiltered(games.filter((jogos:any)=>jogos.championshipId === id))
    }

    const [isLoading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [unique, setUnique] = useState<boolean>(true)

    useEffect(() => {
        function verificarTamanhoTela() {
        if (window.matchMedia("(max-width: 450px)").matches) {
            setUnique(false);
        } else if (window.matchMedia("(max-width: 727px)").matches) {
            setUnique(true);
        } else {
            setUnique(false); // <= define o valor padrão caso a largura da janela seja maior que 727 pixels
        }
        }

        verificarTamanhoTela();
        window.addEventListener('resize', verificarTamanhoTela);
        
        return () => {
        window.removeEventListener('resize', verificarTamanhoTela);
        };
    }, []);

    return (
        <div className={style.bodyPalpite}>
            {/* style={!unique ? { maxWidth: '110rem' } : { width: '110rem' }} */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1rem 1rem 0rem 1rem', boxSizing: 'border-box' }}>
                <ul className={style.listaLigas}>
                    {
                        championships.map((liga: any, index:any ) => (
                            <li key={index} className={style.listaLigaLI} onClick={() => setGamesExhibition(liga.id)}>{liga.name}</li>
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
                {isLoading && <li> <CardSkeleton video={false} blog={false} cards={games.length} enquete={false} /> </li>}
                {!isLoading && (gamesFiltered.length ? gamesFiltered : games).map((game: any, key: any) => (
                    <li key={key} className={!unique ? style.liPalpiteMult : style.liPalpite}>
                        {!unique && <div className={style.titleCard}> <span className={style.titleCardContent}><Image src={Ball} alt="" />{championships.filter((campeonato: any) => campeonato.id === game.championshipId).map((campeonato: any) => campeonato.name)}</span> {/* <span>{game.hora}</span>*/}</div>}
                        <div className={!unique ? style.contentContainerMult : style.contentContainer}>
                            <span className={style.spanPalpiteTime}>
                                <Image className={style.imgPalpite} src={game.teamsGame[0].team.image} width={45} height={45} alt="" />
                                <p className={style.nomeTimeCard}>
                                    {game.teamsGame[0].team.name}
                                </p>
                            </span>
                            <input type='text' pattern="\d{1,2}" onInput={(e: any) => { e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 2); }} className={style.inputPalpite} />
                            <div className={style.spanPalpiteX}>
                                <p>X</p>
                                {unique && <p className={style.pPalpite}>
                                    {/*game.hora*/}
                                </p>}
                            </div>
                            <input type='text' pattern="\d{1,2}" onInput={(e: any) => { e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 2); }} className={style.inputPalpite} />
                            <span className={style.spanPalpiteTime}>
                                <Image className={style.imgPalpite} src={game.teamsGame[1].team.image} width={45} height={45} alt="" />
                                <p className={style.nomeTimeCard}>
                                    {game.teamsGame[1].team.name}
                                </p>
                            </span>
                        </div>
                    </li>
                )
                )}
            </ul>
        </div>
    )
}

export default CardPalpite