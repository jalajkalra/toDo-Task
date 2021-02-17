console.log("Service Worker Loaded");

self.addEventListener('push', e=>{
    const data = e.data.json();
    self.registration.showNotification(data.title,{
        body:'Notification From Aiotize Task App',
        icon:'http://www.aicjklu.in/img/portfolio/Aiotize.PNG'
    })
})