async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    const isCreator = false;
    if (username && email && password) {
        console.log("Creating client...");
        const response = await fetch('/api/users/client', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password,
                isCreator,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#create-button').addEventListener('click', signupFormHandler);