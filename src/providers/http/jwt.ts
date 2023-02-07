import {JWTPayload, jwtVerify} from 'jose';


export async function verify(token: string, secret: string): Promise<JWTPayload> {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    // run some checks on the returned payload, perhaps you expect some specific values

    // if its all good, return it, or perhaps just return a boolean
    return payload;
}

export async function authorizationToken(req:any): Promise<string> {
    try{

        const authorization = req.headers.authorization || ''
        const token = <string>authorization.replace('Bearer ', '');
        return token

    } catch(err) { return '';}
}

