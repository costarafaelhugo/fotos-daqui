function inicia() {
    const status = document.querySelector('.status');
    const titulo = document.querySelector('.titulo');
    let json = {}, imgIndex = 0;

    function localCerto(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        status.textContent = `Licalização Atual: ${latitude}, ${longitude}`;

        getJson(assembleSearchURL(latitude, longitude))
    }

    function localInvalido() {

        const longitude = -46.6417273;
        const latitude = -23.5499158;
        status.textContent = `Loalização não encontrada, mostrando local padrão (Região da Sé-SP): ${latitude}, ${longitude}`;

        getJson(assembleSearchURL(latitude, longitude))
    }

    function assembleSearchURL(lat, lon) {
        const proxy = 'https://shrouded-mountain-15003.herokuapp.com/'
        return proxy +
            `https://flickr.com/services/rest/?` +
            `api_key=f28f6f6111a311294dc988ab32e57546&` +
            `format=json&` +
            `nojsoncallback=1&` +
            `method=flickr.photos.search&` +
            `safe_search=1&` +
            `per_page=5&` +
            `lat=${lat}&` +
            `lon=${lon}&` +
            `&text=street`
    }

    function getJson(url) {
        fetch(url)
            .then((resposta) => {
                return resposta.json();
            })
            .then((data) => {
                json = data;
                titulo.textContent = data.photos.photo[0].titulo
                const imageUrl = constructImageURL(data.photos.photo[0]);
                displayImage(imageUrl);
            });
    }

    function displayImage(url) {
        let img = document.querySelector('.image');
        img.src = url;
        let div = document.querySelector('.image-wrapper');
        div.appendChild(img);
    }

    function constructImageURL(photoObj) {
        return "https://farm" + photoObj.farm +
            ".staticflickr.com/" + photoObj.server +
            "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
    }

    function prevImg() {
        if (imgIndex > 0) {
            imgIndex--;
            displayImage(constructImageURL(json.photos.photo[imgIndex]));
            titulo.textContent = json.photos.photo[imgIndex].titulo;
        }
    }

    function proximoImg() {
        if (imgIndex < json.photos.photo.length - 1) {
            imgIndex++;
            displayImage(constructImageURL(json.photos.photo[imgIndex]))
            titulo.textContent = json.photos.photo[imgIndex].titulo;
        }
    }

    navigator.geolocation.getCurrentPosition(localCerto, localInvalido);
    document.querySelector('.anterior').addEventListener('click', prevImg);
    document.querySelector('.proximo').addEventListener('click', proximoImg);
}

inicia()