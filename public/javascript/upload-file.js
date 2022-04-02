const form = document.querySelector("#uploadImage");

async function handleSubmit(e) {
    e.preventDefault();

    let file = document.getElementById("image-file").files[0];
    let alt_text = document.getElementById("alt_text").value;
    let description = document.getElementById("description").value;
    console.log(file);

    // send post request usingi axios as
    // doing it the standard method was causing
    // the 'file' to become undefined
    const data = new FormData()
    data.append('image', file)
    data.append('alt_text', alt_text)
    data.append('description', description)

    await axios.post('/api/posts/', data);
}


form.addEventListener('submit', handleSubmit);