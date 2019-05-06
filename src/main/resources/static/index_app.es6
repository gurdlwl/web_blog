$(function (){
    getPostList();
    getUserInfo();
    getPostTitleList();
});

let post;
let default_url = "http://localhost:8080"

async function getPostList() {
    try {
        let response = await $.get(default_url +'/ViewAllPost');

        for (let i = 0; i < response.data.length; i++) {
            post = response.data[i];
        }

        $('#content').html(`
                <div id="line_${post.id}">
                    <div class="post-title">${post.title}</div><hr>
                    <div class="post-username">${post.username}</div>
                    <div class="post-content">${post.content}</div>
                    <div class="post-created">${post.created}</div>
                    <div class="post-modified">${post.modified}</div>
                    <div class="post-footer">
                        <div>이전</div>
                        <button class="post-edit" id="post-edit" onclick="editPost(this, ${post.id})">수정</button>
                        <button class="post-delete" id="post-delete" onclick="deletePost(this, ${post.id})">삭제</button>
                        <div>다음</div>
                    </div>
                    <pre> \n </pre>
                </div>
            `);
    } catch (e) {
        console.log(e);
    }
}

async function getPost(id){
    try{
        let response = await $.get(default_url +'/ViewPost/' + id)
        post = response.data;

        $('#content').html(`
                <div id="line_${post.id}">
                    <div class="post-title">${post.title}</div><hr>
                    <div class="post-username">${post.username}</div>
                    <div class="post-content">${post.content}</div>
                    <div class="post-created">${post.created}</div>
                    <div class="post-modified">${post.modified}</div>
                    <div class="post-footer">
                        <div>이전</div>
                        <button class="post-edit" id="post-edit" onclick="editPost(this, ${post.id})">수정</button>
                        <button class="post-delete" id="post-delete" onclick="deletePost(this, ${post.id})">삭제</button>
                        <div>다음</div>
                    </div>
                    <pre> \n </pre>
                </div>
            `);
    } catch (e) {
        console.log(e);
    }
}

async function getPostTitleList(){
    try{
        let response = await $.get(default_url +'/ViewAllPost');

        for (let i = 0; i < response.data.length; i++){
            let postId = response.data[i].id;
            let postTitle = response.data[i].title;

            $('#post-title-list').prepend(`
                <li onclick="getPost(${postId})">${postTitle}</li>
            `)
        }

    } catch (e) {
        console.log(e);
    }
}

async function postNewPost(){
    $('#main-container').html("");

    try{

    } catch (e){
        console.log(e);
    }
}

async function editPost(button, id){

}

async function deletePost(button, id){
    if($(button).text('삭제')){
        $.ajax({
            type :'DELETE',
            url : default_url +'/DeletePost/' + id,
            contentType: 'application/json',
            success: function (response) {
                if(response.data == true){
                    getPostList();
                } else
                    alert("Post 삭제 실패.");
            },
            error: function(e){
                console.log(e);
            }
        });
    } else if(!$(button).text('삭제')){

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

