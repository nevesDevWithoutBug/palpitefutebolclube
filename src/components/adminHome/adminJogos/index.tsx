import { useEffect, useState } from 'react'
import style from './style.module.css'
import Image from 'next/image'
import Api from 'src/providers/http/api'
import { TeamType } from 'src/types/TeamType'
import { ChampionshipType } from 'src/types/ChampionshipType'
import Spinner from "src/components/spinner"
import { toast } from "react-toastify";
import timeBranco from "/public/assets/assets/clubes/branco.png"

function JogosComponent() {

    const [games, setGames] = useState<any[]>([])

    const [ligas, setLigas] = useState<ChampionshipType[]>([])

    const [ligaSelecionada, setLiga] = useState({ id: 0, name: 'Selecione uma liga' })

    const [editar, setEdit] = useState(NaN)

    const [teams, setTeams] = useState<TeamType[]>([])

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            const teams = await Api.get('/api/auth/team')
            setTeams(teams)
            const championship = await Api.get('/api/auth/championship')
            setLigas(championship);
            const games = await Api.get('/api/auth/game')
            setGames(games)
            setIsLoading(false)
        })()
    }, [])

    const validateInput = (value: string) => {
        const regex = /^\d+(?:\.\d{0,2})?$/;
        return regex.test(value);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, id:number) => {
        const { value } = event.target;
        if (!validateInput(value)) return;
        if(id === 0)setGames([...games, games[index].firstTeam.gol = Number(value)])
        if(id === 1)setGames([...games, games[index].secondTeam.gol = Number(value)])
    };

    const save = async (idLiga: number, index: number) => {
        setIsLoading(true)
        const body = { 
            id: games[index].id,
            name: 'jogo 2', 
            championshipId: idLiga, 
            firstTeam:{ id: games[index].firstTeam.id, gol: games[index].firstTeam.gol }, 
            secondTeam:{ id: games[index].secondTeam.id, gol: games[index].secondTeam.gol } 
        }
        const response = await Api.post('/api/auth/game', body)
        if(response.id) toast.success('Jogo Salvo com sucesso!')
        const game = await Api.get('/api/auth/game')
        setGames(game)
        setEdit(NaN)
        setIsLoading(false)
    }
    
    const del = async (index: number) => {
        setIsLoading(true)
        const body = {
            id: games[index].id
        }
        const response = await Api.delete('/api/auth/game', body)
        if(response.id) toast.success('Jogo excluído com sucesso!')
        const game = await Api.get('/api/auth/game')
        setGames(game)
        setIsLoading(false)
    } 
    
    function brDate(date:any){ return (new Date(date)).toLocaleString('pt-BR')}

    function handlerImage(name: string) { 
        name = name.replace(/\s+/g, "").replace(/-/g, "")
        return `/assets/assets/clubes/${name.replace(/\s+/g, "").charAt(0).toUpperCase()}${name.slice(1)}.png`
    }

    return (
        <>
        {isLoading && <Spinner></Spinner>}
            <div className={style.jogoHeader}>
                <div style={{ display: 'flex', textAlign: 'center', alignItems: 'center' }}>
                    <svg className={style.svgHeader} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M177.1 228.6L207.9 320h96.5l29.62-91.38L256 172.1L177.1 228.6zM255.1 0C114.6 0 .0001 114.6 .0001 256S114.6 512 256 512s255.1-114.6 255.1-255.1S397.4 0 255.1 0zM435.2 361.1l-103.9-1.578l-30.67 99.52C286.2 462.2 271.3 464 256 464s-30.19-1.773-44.56-4.93L180.8 359.6L76.83 361.1c-14.93-25.35-24.79-54.01-27.8-84.72L134.3 216.4L100.7 118.1c19.85-22.34 44.32-40.45 72.04-52.62L256 128l83.29-62.47c27.72 12.17 52.19 30.27 72.04 52.62L377.7 216.4l85.23 59.97C459.1 307.1 450.1 335.8 435.2 361.1z" />
                    </svg>
                    Administração da rodada
                </div>
                <div className="relative">
                <select onChange={(event) => setLiga(prevState => ({...prevState, id: Number(event.target.value)}))} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" style={{textAlign: 'center'}}>
                        <option value={NaN}>Selecione uma liga</option>
                        {ligas.map((liga, key) => {
                            return (
                                <option value={liga.id} key={key}>{liga.name}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className={style.jogoContent}>
                <div className={style.tituloContent}>
                    {ligas.map((liga, key) => {
                        if(liga.id === ligaSelecionada.id){
                            ligaSelecionada.name = ''
                            return(
                                liga.name
                                )
                        }
                    })}
                    {ligaSelecionada.name}
                </div>
                <ul className={style.ulPalpite}>
                    {games.map((game, key) => {
                        if (game.championshipId == ligaSelecionada.id)
                            return (
                                <li key={key} className={style.liPalpite}>
                                    <div className={style.contentContainer}>
                                        <span className={style.spanPalpiteTime}>
                                        <Image className={style.imgPalpite} src={game.firstTeam && game.firstTeam.name ?handlerImage(game.firstTeam.name):timeBranco} width={50} height={50} alt="" />
                                            <p className={style.nomeTimeCard}>
                                                {game.firstTeam && game.firstTeam.name}
                                            </p>
                                        </span>
                                        <input value={game.firstTeam ? game.firstTeam.gol : 0} onChange={(event) => handleInputChange(event, key, 0)} disabled={editar !== key} className={editar === key ? style.inputPalpite : style.inputPalpiteDisabled}></input>
                                        <div className={style.spanPalpiteX}>
                                            <p>X</p>
                                            <p className={style.pPalpite}>{game.start ? brDate(game.start): '00/00/0000, 00:00:00'}</p>
                                        </div>
                                        <input value={game.secondTeam ? game.secondTeam.gol : 0} onChange={(event) => handleInputChange(event, key, 1)} disabled={editar !== key} className={editar === key ? style.inputPalpite : style.inputPalpiteDisabled}></input>
                                        <span className={style.spanPalpiteTime}>
                                        <Image className={style.imgPalpite} src={game.secondTeam && game.secondTeam.name ?handlerImage(game.secondTeam.name):timeBranco} width={50} height={50} alt="" />
                                            <p className={style.nomeTimeCard}>
                                                {game.secondTeam && game.secondTeam.name}
                                            </p>
                                        </span>
                                    </div>
                                    <div className={style.acao}>
                                        {editar !== key ?
                                            <button className={style.buttonEditar} onClick={() => setEdit(key)}>
                                                <svg className={style.acaoEditar} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                                                </svg>
                                            </button>
                                            :
                                            <button className={style.buttonSalvar} onClick={() => save(ligaSelecionada.id, key)}>
                                                <svg className={style.acaoEditar} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path fill="white" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
                                                </svg>
                                            </button>
                                        }
                                        <button className={style.buttonExcluir} onClick={() => del(key)}>
                                            Finalizar jogo
                                        </button>
                                    </div>
                                </li>
                            )
                    })}
                </ul>
            </div>
        </>
    )
}

export default JogosComponent