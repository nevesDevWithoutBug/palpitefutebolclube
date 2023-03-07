import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Spinner from "src/components/spinner";
import Api from "src/providers/http/api"

function AdminHomeInfoComponent() {

    const [urlVídeo, setUrlVídeo] = useState<String>('')

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            const { value } = await Api.get('/api/auth/config?name=URLvideo')
            setUrlVídeo(value)
            setIsLoading(false)
        })()
    }, [])

    async function handlerUrl() {
        setIsLoading(true)
        const body = {
            id: 1,
            name: 'URLvideo',
            value: urlVídeo
        }

        const response = await Api.post('/api/auth/config', body)
        if(response.id) toast.success('Vídeo adicionado com sucesso!')
        const { value } = await Api.get('/api/auth/config?name=URLvideo')
        setUrlVídeo(value)
        setIsLoading(false)
    }

    return (
        <>
            {isLoading && <Spinner></Spinner>}
            <label> URL do vídeo</label>
            <input value={String(urlVídeo)} onChange={(event) => setUrlVídeo(event.target.value)} type="text" />
            <button onClick={() => handlerUrl()}>Salvar</button>
        </>
    )
}

export default AdminHomeInfoComponent