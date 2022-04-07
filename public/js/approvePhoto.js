async function approvePhotoHandler() {

    const post_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];

    const response = await fetch('/api/posts/', {
        method: "PUT",
        body: JSON.stringify({
            post_id
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        document.location.reload();
    } else {
        console.log("Error");
    }
}



if (document.querySelector('#button-approval')) {
    document.querySelector('#button-approval').addEventListener('click', approvePhotoHandler);
}