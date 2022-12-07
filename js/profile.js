// 로그아웃
function handleLogout(){
    localStorage.clear()
    window.location.replace("api.html")
}

const main_url = "http://127.0.0.1:8000"
const payload = localStorage.getItem('payload')
const personObj = JSON.parse(payload)
const userId = personObj['user_id']
const username = personObj['username']



window.onload = () => {
    loaduseruploadimg();
}



// 로딩 될때 user 이름과 프로필 사진을 불러옴
async function loaduseruploadimg(){
    const response = await fetch (`${main_url}/users/${userId}/profile/`, {method:"GET"})

    response_json = await response.json()

    // 로딩시 user 이름 가져오기
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)

    const user_name = document.getElementById('user_name')
    user_name.innerText = payload_parse.username

    const user_profile_img = response_json['profile_img']

    const img = document.getElementById('user_profile_img')
    img.setAttribute('src', `${main_url}${user_profile_img}`)

    // 사진 미리보기
    const fileInput = document.getElementById("file")
    const handleFiles = (e) => {
        const fileReader = new FileReader()
        const selectedFile = fileInput.files;
        fileReader.readAsDataURL(selectedFile[0])
        fileReader.onload = function(){
            document.getElementById("user_profile_img").src = fileReader.result
        }
    }
    fileInput.addEventListener("change", handleFiles)

}


// 프로필 사진 업로드 및 수정 하기
async function userProfileUpload(){
    const img = document.querySelector('#file')
    
    const formdata = new FormData()
    formdata.append('profile_img',img.files[0])

    const response = await fetch(`${main_url}/users/${userId}/profile/`, {
        headers: { 
            'Authorization': 'Bearer '+ localStorage.getItem('access')
        },
        method: 'PUT',
        body: formdata
    }
    )
}