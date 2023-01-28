import Cookie from "../storage/cookie";

interface Http {
    (url: string, object?: any): Promise<JSON | any>
}

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
interface ApiType {
    get: Http,
    post: Http
    put?: Http, 
    delete: Http, 
    auth: <JSON = any>(url: string, object: any) => Promise<JSON>, 
    signOut: () => Promise<void>
}


function fetchApi():ApiType {

    const getMethod: Http = async <JSON = any>(url: string, object?: any): Promise<JSON> => {
        
        const response = await fetch(url + `${ object ? `?${new URLSearchParams(object)}` : ''}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${await Cookie.get('auth')}`,
            },
        })
        return await response.json()
          
    }
    
    const postMethod: Http = async <JSON = any>(url: string, object: any): Promise<JSON> => {
            
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${await Cookie.get('auth')}`,
            },
            body: JSON.stringify(object)
        })
        return await response.json()
    }
    // const putMethod:Http = async <JSON = any>(url: string, object: any): Promise<JSON> => {

    // }
    
    const deleteMethod: Http = async <JSON = any>(url: string, object?: any): Promise<any> => {
            
        const response = await fetch(url + `${ object ? `?${new URLSearchParams(object)}` : ''}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${await Cookie.get('auth')}`,
            },
        })
        return response.status === 204 ? response : await response.json()
    }

    async function authMethod<JSON = any>(url: string, object: any,): Promise<JSON> {

        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(object)
        })
        const data = await response.json()
        await Cookie.set('auth', data.accessToken, 360)
        return data
    }

    async function signOutMethod(): Promise<void> {
        try{

            await Cookie.expire('auth')
            if(typeof window !== 'undefined') window.location.reload()

        } catch(err){

            console.log('An error occurred when logging out: ', err)
            if(typeof window !== 'undefined') window.location.reload()

        }
    }

    return {
        get: getMethod,  
        post: postMethod, 
        // put: putMethod, 
        delete: deleteMethod, 
        auth: authMethod, 
        signOut: signOutMethod
    }
}

/**
 * `Api` is a fetch factory that provide simple http methods.
 * 
 * It used the same API RESTful design pattern.
 *
 * ```js
 * await Api.post('www.example.products', { name:'table' })
 * // { id:1, name: 'table' }, 
 * 
 * await Api.get('www.example.users/')
 * //[ { name: 'John Doe' },  { name: 'Gabriel Henrique' } ]
 * 
 * await Api.get('www.example.products', { id:1 })
 * // { name: 'Gabriel Henrique' }, 
 * 
 * await Api.delete('www.example.products', { id: 1 })
 * //    { id:1, name:'table' }
 * ```
 *
 * See `www.google.com` for more information.
 * @since v0.1 by [`Gabriel henrique`](https://github.com/gab-h3nrique)
 */
const Api = fetchApi()

export default Api

//--------------------------------------

// function absoluteUrl() {
//     if(typeof window !== 'undefined') {
//         const url = window.location.href
//         return url
//         // return window.location.hostname;
//     }
// }