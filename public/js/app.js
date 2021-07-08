

console.log("I am connected")

const weatherForm=document.querySelector('form')
const search=document.querySelector("input")
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

// messageOne.textContent='From Javascript'

weatherForm.addEventListener('submit',(e)=>{
    //debugger
    e.preventDefault()

    const location=search.value

    fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            // console.log(data.error);
            messageOne.textContent=data.error;
        }
        else{
            messageOne.textContent='Location:'+ data.location
            messageTwo.textContent='  Forecast:'+data.forecast;
        }
    })
})

})