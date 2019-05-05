$(function (){
    getPostList();
    getUserInfo();
    getPostTitleList();
});

async function getPostList() {
    try {
        let response = await $.get('http://localhost:8080/ViewAllPost');

        for (let i = 0; i <= response.data.length; i++) {
            let post = response.data[i];

            $('#content').html(`
                <div id="line_${post.id}">
                    <div class="post-title">${post.title}</div>
                    <div class="post-username">${post.username}</div>
                    <div class="post-content">${post.content}</div>
                    <div class="post-created">${post.created}</div>
                    <div class="post-modified">${post.modified}</div>
                    <div class="post-footer">
                        <div>이전</div>
                        <button class="post-edit" id="post-edit">수정</button>
                        <button class="post-delete" id="post-delete">삭제</button>
                        <div>다음</div>
                    </div>
                    <pre> \n </pre>
                </div>
            `);
        }
    } catch (e) {
        console.log(e);
        console.log(JSON.stringify(e));
    }
}

async function getPostTitleList(){
    try{
        let response = await $.get('http://localhost:8080/ViewAllPost');

        for (let i = 0; i < response.data.length; i++){
            let postTitle = response.data[i].title;

            $('#post-title-list').prepend(`
                <li>${postTitle}</li>
            `)
        }

    } catch (e) {
        console.log(JSON.stringify(e));
    }
}

async function getUserInfo(){
    try{
        let response = await $.get('http://localhost:8080/ViewUser/1');
        let user = response.data;

        $('#profile-image').html(user.profilePath);
        $('#user-id').html(user.id);
        $('#user-name').html(user.name);
        $('#user-join-date').html(user.created);
        $('#user-posted').html("게시물 수");

    } catch (e){
        alert("UserInfo 불러오기 실패");
        console.log(JSON.stringify(e));
    }
}