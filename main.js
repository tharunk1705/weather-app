window.addEventListener('load', () => {
    let latitude;
    let longitude;
    let temperature = document.querySelector(".temperature");
    let location = document.querySelector(".location");
    let summary =  document.querySelector(".summary");
    let dangerText = document.querySelector("#make-hidden");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            
            const apiKey = `ee8d8d8f739857cf1ca51d62809649ca`
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`

            fetch(api)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const {temp} = data.main;
                    console.log(temp);
                    temperature.textContent = `${temp}\xB0 C`;
                    location.textContent = data.name;
                    summary.textContent = data.weather[0].main;
                    dangerText.style.display = "none";
                })

        })
    }else{
        return ("Please enable location access!");
    }
});