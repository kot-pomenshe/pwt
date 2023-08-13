export async function handle({event, resolve}){
    let session = event.cookies.get('session');
    event.locals.session = session;
    return await resolve(event);
}
