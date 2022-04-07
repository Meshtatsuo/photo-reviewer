async function handleCommentSubmit(e) {
    e.preventDefault();

    const comment_text = document.querySelector('#comment-content').value;
    // use window location to find the id of the post
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    console.log(post_id);
    if (comment_text) {
        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({
                comment_text,
                post_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}


document.querySelector("#submit-comment").addEventListener('click', handleCommentSubmit);