export default function Redirect() {

    if(typeof window !== 'undefined') window.location.href = '/app'
    return; 

}