const PUBLIC_VAPID = "BOdkvAjjRavjvSRlxWDAH_csDa3kv-2dGua6SoUoxqTfgMGx4FcQKKw2elpkh0nxKejhiLz6a2dtsuTwO_wgCYI";

export default async function swDev(){
    let swUrl=`${process.env.PUBLIC_URL}/sw.js`
    const register = await navigator.serviceWorker.register(swUrl,{
        scope: "/"
      });

    await navigator.serviceWorker.ready;

    const subscribe = await register.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey:urlBase64ToUint8Array(PUBLIC_VAPID)
    });

    await fetch('http://localhost:5000/subscribe',{
        method:'post',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(subscribe)
    })
}


function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
   
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }