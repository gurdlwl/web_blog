$(function (){
    getPostList();
    getUserInfo();
});

async function getPostList() {
    try {
        let response = await $.get('http://localhost:8080/ViewAllPost');

        for (let i = 0; i < response.length; i++) {
            let post = response[i];

            $('#content').prepend(`
                <div id=${post.id}>
                    <div>${post.title}</div>
                    <div>${post.username}</div>
                    <div>${post.content}</div>
                    <div>${post.created}</div>
                    <div>${post.modified}</div>
                </div>
            `);
        }
    } catch (e) {
        alert("PostList 불러오기 실패");
        console.log(e);
        console.log(JSON.stringify(e));
    }
}

async function getPostTitleList(){
    try{
        let response = await $.get('http://localhost:8080/ViewAllPost');



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