$(function (){
    getPostList();
});

async function getPostList() {
    try {
        let response = await $.get('/ViewAllPost');

        for (let i = 0; i < response.length; i++) {
            let post = response[i];

            $('#content').prepend(`
                            <div id=${post.id}>
                                <div>${post.title}</div>
                                <div>${post.content}</div>
                                <div>${post.created}</div>
                                <div>${post.modified}</div>
                            </div>
                        `)

            alert(response[i].id);
        }
    } catch (e) {
        alert("PostList 불러오기 실패");
        console.log(e);
    }
}