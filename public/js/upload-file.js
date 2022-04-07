async function handleSubmit(e) {
    e.preventDefault();

    let file = document.getElementById("image-file").files[0];
    let title = document.getElementById("title").value;
    let alt_text = document.getElementById("alt_text").value;
    let description = document.getElementById("description").value;
    console.log(file);
    // get client id of selected option in select element
    let select = document.getElementById("select");
    let options = select.options[select.selectedIndex];
    let client_id = options.value;
    console.log(client_id);
    // send post request usingi axios as
    // doing it the standard method was causing
    // the 'file' to become undefined
    const data = new FormData()
    data.append('image', file)
    data.append('alt_text', alt_text)
    data.append('description', description)
    data.append('title', title)
    data.append('client_id', client_id)

    await axios.post('/api/posts/', data);
}


document.querySelector("#upload-btn").addEventListener('click', handleSubmit);