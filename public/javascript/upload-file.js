const form = document.querySelector("#uploadImage");

async function handleSubmit(e) {
    e.preventDefault();

    let file = document.getElementById("image-file").files[0];
    let alt_text = document.getElementById("alt_text").value;
    let description = document.getElementById("description").value;
    console.log(file);


    const data = new FormData()
    data.append('image', file)
    data.append('alt_text', alt_text)
    data.append('description', description)

    await axios.post('/api/posts/', data);


    // if (file && description) {
    //     const response = await fetch('/api/posts/', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             filename: file.name,
    //             path: file.path,
    //             alt_text: alt_text,
    //             description: description,
    //             isApproved: false,
    //             client_id: 1,
    //             user_id: 1
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });

    //     if (response.ok) {
    //         document.location.reload();
    //     } else {
    //         alert(response.statusText);
    //     }
    //}
}











form.addEventListener('submit', handleSubmit);