$(function (){
    getPostList();
    getUserInfo();
    getPostTitleList();
});

let post;
let default_url = "http://localhost:8080";

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
            </div>
        `);
    } catch (e) {
        console.log(e);
    }
}

async function getPost(id){
    try{
        let response = await $.get(default_url +'/ViewPost/' + id);
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
                <li id="title_line_${postId}" onclick="getPost(${postId})">${postTitle}</li>
            `);
        }
    } catch (e) {
        console.log(e);
    }
}

async function addNewPost(){
    $('#content').html("");

    //input 넣기
    $('#content').html(`
            <div>제목</div>
            <input id="new-post-title" type="text" style="width: 50vw;">
            <div>내용</div>
            <textarea id="new-post-content" style="width: 50vw; height: 50vh;"></textarea>
    `);

    try{
        await $.ajax({
            type: 'POST',
            url: default_url + '/InsertPost',
            contentType: 'application/json',
            data: JSON.stringify({
                userId: 1,
                title: $('#new-post-title').val(),
                content: $('#new-post-content').val()
            }),
            success: function (response){
                alert("Post 입력 성공");
            },
            error: function (err){
                console.log(err);
            }
        })

    } catch (e){
        console.log(e);
    }
}

async function editPost(button, id){
    if($(button).text() == '수정'){

        //form input 으로 변경

        $(button).text('확인');
        $(button).next().text('취소');
    } else if($(button).text('확인')){
        try{
            await $.ajax({
                type: 'PUT',
                url: default_url + '/UpdatePost/' + id,
                contentType: 'application/json',
                success: function (response){
                    alert("Post 수정 성공");
                    //input닫고 response값 넣기
                },
                error: function (err){
                    console.log(err);
                }
            })
        } catch(e) {
            console.log(e);
        }

        $(button).text('수정');
        $(button).next().text('삭제');
    }
}

async function deletePost(button, id){
    if($(button).text() == '삭제'){
        $.ajax({
            type:'DELETE',
            url: default_url +'/DeletePost/' + id,
            contentType: 'application/json',
            success: function (response) {
                if(response.data == true){
                    alert("Post 삭제 성공");
                    $('#line_').remove();
                    $(`#title_line_${id}`).remove();
                }
                else
                    alert("Post 삭제 실패");
            },
            error: function(err){
                console.log(err);
            }
        });
    } else if($(button).text() == '취소'){
        $(button).text('삭제');
        $(button).prev().text('수정');
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

