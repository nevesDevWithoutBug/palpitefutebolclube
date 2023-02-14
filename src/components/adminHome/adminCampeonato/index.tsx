import { useEffect, useState } from "react"
import Api from "src/providers/http/api"
import style from "./style.module.css"
import { ChampionshipType } from "src/types/ChampionshipType"
import Spinner from "src/components/spinner";

function CampeonatoCamponent() {

    const [championships, setChampionships] = useState<ChampionshipType[]>([]);
    const [editar, setEdit] = useState(NaN)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            const response = await Api.get('/api/auth/championship')
            setChampionships(response);
            setIsLoading(false)
        })()
    }, [])
    
    async function save(key: number) {
        setIsLoading(true)
        const body = {
            championship: championships[key]
        }
        const volta = await Api.post('/api/auth/championship', body)
        const response = await Api.get('/api/auth/championship')
        setChampionships(response);
        setEdit(NaN)
        setIsLoading(false)
    }

    async function remove(key: number) {
        setIsLoading(true)
        const body = {
            id: championships[key].id
        }
        const volta = await Api.delete('/api/auth/championship', body)
        const response = await Api.get('/api/auth/championship')
        setChampionships(response);
        setEdit(NaN)
        setIsLoading(false)
    }
        
    return (
        <div className={style.jogo}>
            {isLoading && <Spinner></Spinner>}
            <div className={style.jogoHeader}>
                <div style={{ display: 'flex', textAlign: 'center', alignItems: 'center' }}>
                    <svg className={style.svgHeader} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M177.1 228.6L207.9 320h96.5l29.62-91.38L256 172.1L177.1 228.6zM255.1 0C114.6 0 .0001 114.6 .0001 256S114.6 512 256 512s255.1-114.6 255.1-255.1S397.4 0 255.1 0zM435.2 361.1l-103.9-1.578l-30.67 99.52C286.2 462.2 271.3 464 256 464s-30.19-1.773-44.56-4.93L180.8 359.6L76.83 361.1c-14.93-25.35-24.79-54.01-27.8-84.72L134.3 216.4L100.7 118.1c19.85-22.34 44.32-40.45 72.04-52.62L256 128l83.29-62.47c27.72 12.17 52.19 30.27 72.04 52.62L377.7 216.4l85.23 59.97C459.1 307.1 450.1 335.8 435.2 361.1z" />
                    </svg>
                    Administração de campeonatos
                </div>
                <div className="relative">
                </div>
            </div>
            <div className={style.jogoContent}>
                <div className={style.tituloContent}>
                    Campeonatos
                    <div className={style.newRound}>
                        <button className={style.buttonAdd} onClick={() => setChampionships([...championships,{name: ''}])} >
                            Novo campeonato
                        </button>
                    </div>
                </div>
                <div>
                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {championships.map((championship, key) => (
                                <tr key={key}>
                                    <td>{championship.id}</td>
                                    <td>
                                        <input 
                                            disabled={editar !== key} 
                                            className={editar ===key ? style.inputPalpite : style.inputPalpiteDisabled}
                                            value={championship.name} 
                                            onChange={() => setChampionships(prevItems => prevItems.map((item, id) => id === key ? { ...item, name: event.target.value } : item))}
                                            placeholder="Informe o nome do campeonato"/>
                                    </td>
                                    <td style={{width: '2rem'}}>
                                    <div className={style.acao}>
                                        {editar !== key ?
                                            <button className={style.buttonEditar} onClick={() => setEdit(key)}>
                                                <svg className={style.acaoEditar} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                                                </svg>
                                            </button>
                                            :
                                            <button className={style.buttonSalvar} onClick={() => save(key)}>
                                                <svg className={style.acaoEditar} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path fill="white" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
                                                </svg>
                                            </button> 
                                        }
                                        <button className={style.buttonExcluir} onClick={() => remove(key)}>
                                            <svg className={style.acaoEditar} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                            </svg>
                                        </button>
                                    </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}

export default CampeonatoCamponent