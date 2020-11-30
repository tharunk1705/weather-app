window.addEventListener('load', () => {
    let latitude;
    let longitude;
    let temperature = document.querySelector(".temperature");
    let location = document.querySelector(".location");
    let summary =  document.querySelector(".summary");
    let dangerText = document.querySelector("#make-hidden");
    let weatherIcon = document.querySelector(".weather-icon");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            // console.log(position);
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            
            const apiKey = `ee8d8d8f739857cf1ca51d62809649ca`;
            // const accApiKey = 'cgnIabz8Bz31evHPsobhb5hlq1iEaazy';
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
            // const apiAccu = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${accApiKey}&q=${latitude}%2C${longitude}`

            fetch(api)
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    const {temp} = data.main;
                    const weatherSummary = data.weather[0].main
                    // console.log(temp);
                    temperature.textContent = `${temp}\xB0 C`;
                    location.innerHTML = `<i class="fa fa-map-marker" style="color : red" aria-hidden="true"></i> ${data.name} <small style="color : gray"> (Approx) </small>` ;
                    // location.textContent = data.name ;
                    summary.textContent = weatherSummary ;
                    // // weatherIcon.innerHTML = (weatherSummary == 'Rain') ? `<i class="fas fa-cloud-drizzle"></i>` :(weatherSummary === 'Mist') ? `<i class="fas fa-fog"  style="color: gray"></i>` : null;
                    // weatherIcon.innerHTML = `<i class="fas fa-fog fa-3x"  style="color: gray"></i>`;
                    dangerText.style.display = "none";
                })

        })
    }else{
        return ("Please enable location access!");
    }
});