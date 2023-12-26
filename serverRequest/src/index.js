const btn = document.getElementById('btn');
btn.addEventListener('click',()=>{
    const h1 = document.createElement('h1')
    h1.innerText = 'clicked!'
    document.body.appendChild(h1)
})