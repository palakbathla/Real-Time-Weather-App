
const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const maincontent = document.querySelector('.main-content')
const button = document.getElementById('button')
maincontent.classList.add('default')



weatherFrom.addEventListener('submit', (event)=>{
    event.preventDefault()

    
    const location = search.value
    if(location==='')
    {
        messageOne.textContent = ''
        messageTwo.textContent = ''
    }else{
        messageOne.textContent = ''
        messageTwo.textContent = 'Loading...'
        
    }
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
            messageOne.textContent = data.error
        else{
            messageOne.textContent = 'Location: ' + data.location 
            messageTwo.textContent = 'Forcast: ' + data.forcast
            const weather = data.forcast.toString();
            console.log(weather)
            if(weather.includes('clear'))
            {
                maincontent.style.backgroundColor = '#7cc7d9'
                button.style.backgroundColor='#619baa'
                button.style.borderColor = '#619baa'
            }
            else if(weather.includes('rain') || weather.includes('haze'))
            {
                maincontent.style.backgroundColor = '#81a0ae'
                button.style.backgroundColor='#9DC3D5'
                button.style.borderColor = '#9DC3D5'
                               
            }
            else if(weather.includes('smoke')|| weather.includes('cloud'))
            {
                maincontent.style.backgroundColor = '#c2d5dc'
                button.style.backgroundColor='#A0B2B8'
                button.style.borderColor='#A0B2B8'

            }
            else if(weather.includes('sunny'))
            {
                maincontent.style.backgroundColor = '#fbec5d' 
                button.style.backgroundColor = '#E7D62E'   
                button.style.borderColor = '#E7D62E'   
               
            }
        }

    })
})
})