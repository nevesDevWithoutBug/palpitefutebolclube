import Ball from "../../../public/assets/ball.svg"
import { useEffect, useState } from "react"
import style from "./style.module.css"
import Image from "next/image"
import CardSkeleton from "../skeleton"
import Api from "src/providers/http/api"
import { objPalpiteType } from "src/types/objPalpiteType"
import { toast } from "react-toastify"
import timeBranco from "/public/assets/assets/clubes/branco.png"

function CardPalpite() {


    const [games, setGames] = useState<any>([])
    const [championships, setChampionships] = useState<any>([])
    const [gamesFiltered, setGamesFiltered] = useState<any>([])
    const [selectedLi, setSelectedLi] = useState<number | null>(null);
    const [unique, setUnique] = useState<boolean>(true)
    const [isLoading, setLoading] = useState<boolean>(true)
    const [objPalpite, setObjectPalpite] = useState<objPalpiteType>({ id: '', mandante: '0', visitante: '0', horario: '' })

    useEffect(() => {
        (async () => {
            const [championships, games] = await Promise.all([
                Api.get('/api/championship'),
                Api.get('/api/game'),
            ]);
            setGames(games); setChampionships(championships);
            setLoading(false);
            console.log('campeonatos', championships, 'games', games);
        })()
    }, [])

    const setGamesExhibition = (id: any) => {
        setGamesFiltered(games.filter((jogos: any) => jogos.championshipId === id))
    }

    const sendPalpite = (objPalpite: objPalpiteType) => {
        const { horario } = objPalpite
        const dataDoJogo = new Date(Date.parse(horario));
        const horaAtual = new Date();

        if (dataDoJogo <= horaAtual) {
            // O jogo já começou ou está em andamento, então não pode enviar o palpite
            return toast.error('Jogo já começou ou está em andamento, você não pode enviar um palpite')
        } else {
            // O jogo ainda não começou, pode enviar o palpite
            return toast.success('Marcha no progresso')
        }
    }


    function handlerImage(name: string) {
        name = name.replace(/\s+/g, "").replace(/-/g, "")
        return `/assets/assets/clubes/${name.replace(/\s+/g, "").charAt(0).toUpperCase()}${name.slice(1)}.png`
    }


    useEffect(() => {
        //aqui eu controlo qual card é o padrao da tela por meio de um state.
        function verificarTamanhoTela() {
            if (window.matchMedia("(max-width: 450px)").matches) {
                setUnique(false);
            } else if (window.matchMedia("(max-width: 727px)").matches) {
                setUnique(true);
            } else if (window.matchMedia("(min-width: 728px)").matches) {
                setUnique(true);
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
                        championships.map((liga: any, index: any) => (
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
                    <li key={key} className={!unique ? style.liPalpiteMult : style.liPalpite} onClick={() => { setSelectedLi(key); setObjectPalpite({ id: '', mandante: '0', visitante: '0', horario: '' }) }}>
                        {!unique &&
                            <div className={style.titleCard}>
                                <span className={style.titleCardContent}>
                                    <Image src={Ball} alt="" />
                                    {championships.filter((campeonato: any) => campeonato.id === game.championshipId).map((campeonato: any) => campeonato.name)}
                                </span>
                                <p className={style.pPalpite}>
                                    {new Date(game.start).toLocaleDateString('pt-BR').split('/').slice(0, 2).join('/')} as {new Date(game.start).toLocaleTimeString('pt-BR').split(':').slice(0, 2).join(':')}
                                </p>
                            </div>}
                        <div className={!unique ? style.contentContainerMult : style.contentContainer}>
                            <span className={style.spanPalpiteTime}>
                                <Image className={style.imgPalpite} src={game.firstTeam && game.firstTeam.name ? handlerImage(game.firstTeam.name) : timeBranco} width={50} height={50} alt="" />
                                <p className={style.nomeTimeCard}>
                                    {game.firstTeam.name}
                                </p>
                            </span>
                            <input type='text' pattern="\d{1,2}" placeholder="0" onChange={(e) => setObjectPalpite({ ...objPalpite, mandante: e.target.value })} onInput={(e: any) => { e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 2); }} className={style.inputPalpite} />
                            <div className={style.spanPalpiteX}>
                                <p>X</p>
                                {unique && <p className={style.pPalpiteUnique}>
                                    {new Date(game.start).toLocaleDateString('pt-BR').split('/').slice(0, 2).join('/')} as {new Date(game.start).toLocaleTimeString('pt-BR').split(':').slice(0, 2).join(':')}
                                </p>}
                            </div>
                            <input type='text' pattern="\d{1,2}" placeholder="0" onChange={(e) => setObjectPalpite({ ...objPalpite, visitante: e.target.value })} onInput={(e: any) => { e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 2); }} className={style.inputPalpite} />
                            <span className={style.spanPalpiteTime}>
                                <Image className={style.imgPalpite} src={game.secondTeam && game.secondTeam.name ? handlerImage(game.secondTeam.name) : timeBranco} width={50} height={50} alt="" />
                                <p className={style.nomeTimeCard}>
                                    {game.secondTeam.name}
                                </p>
                            </span>
                        </div>
                        <button className={selectedLi === key ? style.btnPalpite : style.btnPalpiteOff} onClick={() => sendPalpite({ ...objPalpite, id: game.id, horario: game.start })}>PALPITAR</button>
                    </li>
                )
                )}
            </ul>
        </div>
    )
}

export default CardPalpite