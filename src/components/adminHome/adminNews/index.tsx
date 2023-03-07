import Image from "next/image"
import { useEffect, useState } from "react"
import Api from "src/providers/http/api";
import style from "./style.module.css"
import Cookie from "src/providers/storage/cookie"
import Spinner from "src/components/spinner";
import { toast } from "react-toastify";

function NewsComponent() {

    const [editar, setEdit] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [news, setNews] = useState<any[]>([])
    
    const [newsEdit, setNewsEdit] = useState({id:NaN, title:'', content:'' })

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            const news = await Api.get('/api/auth/news')
            setNews(news)
            setIsLoading(false)
        })()
    }, [])

    function add() {
        setEdit(true)
    }

    const save = async () => {
        if(!newsEdit.title || !newsEdit.content) return toast.error('Título e o conteúdo obrigatórios')
        setIsLoading(true)
        const getCookie : any = await Cookie.get('user')
        const user = JSON.parse(getCookie);
        const body = { 
            news: {
                id: newsEdit.id ? newsEdit.id : undefined,
                title: newsEdit.title,
                content: newsEdit.content, 
                userId: Number(user.id),
            }
        }
        const response = await Api.post('/api/auth/news', body)
        if(response.id) toast.success('Notícia salva com sucesso!')
        const news = await Api.get('/api/auth/news')
        setNews(news)
        setNewsEdit({id:NaN, title :'', content :'' })
        setEdit(false)
        setIsLoading(false)
    }
    function edit(key: number) {
        setNewsEdit({id : news[key].id, title : news[key].title, content : news[key].content })
        setEdit(true)
    }

    async function remove() {
        setIsLoading(true)
        const body = {
            id: newsEdit.id
        }
        const response = await Api.delete('/api/auth/news', body)
        if(response.id) toast.success('Notícia excluída com sucesso!')
        const news = await Api.get('/api/auth/news')
        setNews(news)
        setNewsEdit({id: NaN, title: '', content: '' })
        setEdit(false)
        setIsLoading(false)
    }

    function handlerImage(image: string) {
        if(!image) return ''
        if(image === 'cruzeiro') return '/assets/assets/clubes/Cruzeiro.png'
        if(image === 'atletico') return '/assets/assets/clubes/AtléticoMG.png'
    }

    return (
        <div className={style.jogo}>
            {isLoading && <Spinner></Spinner>}
            <div className={style.jogoHeader}>
                <div style={{ display: 'flex', textAlign: 'center', alignItems: 'center' }}>
                    <svg className={style.svgHeader} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M177.1 228.6L207.9 320h96.5l29.62-91.38L256 172.1L177.1 228.6zM255.1 0C114.6 0 .0001 114.6 .0001 256S114.6 512 256 512s255.1-114.6 255.1-255.1S397.4 0 255.1 0zM435.2 361.1l-103.9-1.578l-30.67 99.52C286.2 462.2 271.3 464 256 464s-30.19-1.773-44.56-4.93L180.8 359.6L76.83 361.1c-14.93-25.35-24.79-54.01-27.8-84.72L134.3 216.4L100.7 118.1c19.85-22.34 44.32-40.45 72.04-52.62L256 128l83.29-62.47c27.72 12.17 52.19 30.27 72.04 52.62L377.7 216.4l85.23 59.97C459.1 307.1 450.1 335.8 435.2 361.1z" />
                    </svg>
                    Administração das notícias
                </div>
            </div>
            <div className={style.jogoContent}>
                {!editar && <div className={style.tituloContent}>
                    <div className={style.newRound}>
                        <button className={style.buttonAdd} onClick={() => add()} >Nova notícia</button>
                    </div>
                    {/* <div className={style.deleteRound}>
                        { editar && <button className={style.buttonDelete} onClick={() => remove()} >Excluir notícia</button>}
                    </div> */}
                </div>}
                { editar && <div className={style.inputsDiv}>
                    <input value={newsEdit.title} onChange={(event) => setNewsEdit(prevState => ({...prevState, title: event.target.value}))} className={style.inputTitle} type="text" placeholder="Digite o titulo" />
                    <textarea maxLength={499} value={newsEdit.content} onChange={(event) => setNewsEdit(prevState => ({...prevState, content: event.target.value}))} className={style.textarea} placeholder="Digite o conteúdo" />
                    <span className={style.contador}>Caracteres restantes: {499 - newsEdit.content.length}</span>
                    <div className={style.acao}>
                        <div>
                            
                        </div>
                        <div>
                            <button className={style.buttonDelete} onClick={() => remove()} >Excluir notícia</button>
                            <button className={style.buttonAdd} onClick={() => save()} >Salvar notícia</button>
                        </div>
                    </div>
                </div> }
                {!editar &&
                    <div style={{ width: '100%', height: '90%', display: 'flex', alignItems:'center', flexDirection: 'column', gap: '10px'}}>
                        {!news.length && <p>Sem notícias cadastradas...</p>}
                        {news.map((e, key) => {
                            return ( 
                                <div key={key} onClick={() => edit(key)} className={style.card}>
                                    <div className={style.news}>
                                        <Image src={String(handlerImage(e.author.team))} alt="" width={80} height={80} />
                                        <div className={style.newsContent}>
                                            <span style={{ fontSize: '1.3rem' }}>{e.title}</span>
                                            <span style={{ overflow: 'hidden' ,fontSize: '0.9rem', textOverflow: 'ellipsis', whiteSpace:'nowrap', maxWidth: '40ch' }}>{e.content}</span>
                                            <h6 style={{ fontSize: '0.9rem' }}><b>Autor: </b> {e.author.name}</h6>
                                        </div>
                                    </div>
                                </div> 
                            )
                        })}
                        {news.length > 0 && <button onClick={() => {setIsLoading(true); setIsLoading(false)}} className={style.button}>Carregar mais</button>}
                    </div>}
            </div>
        </div>
    )
}

export default NewsComponent