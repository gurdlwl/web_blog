$(function (){
    getPostList();
    getUserInfo();
    getPostTitleList();
});

let post;
let default_url = "http://localhost:8080";
let title;
let content;

async function getPostList() {
    try {
        let response = await $.get(default_url +'/ViewAllPost');

        for (let i = 0; i < response.data.length; i++) {
            post = response.data[i];
        }

        $('#content').html(`
            <div id="line_${post.id}">
                <div class="post-title">${post.title}</div>
                <div>
                    <div class="post-username setInline">${post.username}</div>
                    <div class="post-created setInline">${post.created}</div>
                    <button class="post-edit" id="post-edit" onclick="editPost(this, ${post.id})">수정</button>
                    <button class="post-delete" id="post-delete" onclick="deletePost(this, ${post.id})">삭제</button>
                </div><hr>
                <div class="post-content">${post.content}</div>
                <div class="post-footer">
                    <div>
                        <div class="link setInline" onclick="prevPost(${post.id})">이전</div>
                        <div class="link setInline" onclick="nextPost(${post.id})">다음</div>
                    </div>
                    
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
                <div class="post-title">${post.title}</div>
                <div>
                    <div class="post-username setInline">${post.username}</div>
                    <div class="post-created setInline">${post.created}</div>
                    <button class="post-edit" id="post-edit" onclick="editPost(this, ${post.id})">수정</button>
                    <button class="post-delete" id="post-delete" onclick="deletePost(this, ${post.id})">삭제</button>
                </div><hr>
                <div class="post-content">${post.content}</div>
                <div class="post-footer">
                   <div>
                        <div class="link setInline" onclick="prevPost(${post.id})">이전</div>
                        <div class="link setInline" onclick="nextPost(${post.id})">다음</div>
                    </div>
                    
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
                <li class="link" id="title_line_${postId}" onclick="getPost(${postId})">${postTitle}</li>
            `);
        }
    } catch (e) {
        console.log(e);
    }
}

function addPostSet(){
    $('#content').html("");

    $('#content').html(`
            <div>제목</div>
            <input id="new-post-title" type="text" style="width: 50vw;">
            <div>내용</div>
            <textarea id="new-post-content" style="width: 50vw; height: 50vh;"></textarea>
            <div> 
                <button onclick="addNewPost()">게시</button>
                <button onclick="window.location.reload()">취소</button>
            </div>
    `);

}

async function addNewPost(){
    if( $('#new-post-title').val() == "" || $('#new-post-content').val() == ""){
        alert("제목과 내용을 입력해주세요");
        return;
    }

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
            success: function (){
                alert("Post 입력 성공");
                window.location.reload();
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
    let postNum = $(`#line_${id}`);

    if($(button).text() == '수정'){
        title = postNum.find($('.post-title')).html();
        content = postNum.find($('.post-content')).html();

        postNum.find($('.post-title')).html(`<input value="${title}">`);
        postNum.find($('.post-content')).html(`<input value="${content}">`);


        $(button).text('확인');
        $(button).next().text('취소');
    } else if($(button).text('확인')){
        try{
            await $.ajax({
                type: 'PUT',
                url: default_url + '/UpdatePost/' + id,
                contentType: 'application/json',
                data: JSON.stringify({
                    title: postNum.find($('.post-title')).html().children().val(),
                    content: postNum.find($('.post-content')).html().children().val()
                }),
                success: function (response){
                    alert("Post 수정 성공");
                    postNum.find($('.post-title')).html(response.title);
                    postNum.find($('.post-content')).html(response.content);
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
                    window.location.reload();
                }
                else
                    alert("Post 삭제 실패");
            },
            error: function(err){
                console.log(err);
            }
        });
    } else if($(button).text() == '취소'){
        $(`#line_${id}`).find($('.post-title')).html(title);
        $(`#line_${id}`).find($('.post-content')).html(content);

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

function prevPost(id){

}

function nextPost(id){

}