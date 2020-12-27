// const
// blueBtn = document.querySelector(".blueBtn"),
// yellowBtn = document.querySelector(".yellowBtn"),
// pinkBtn = document.querySelector(".pinkBtn"),
// shirt = document.querySelector(".nav1"),
// pants = document.querySelector(".nav2"),
// skirt = document.querySelector(".nav3"),
// item = document.querySelectorAll(".item"),
// image = document.querySelectorAll("img"),
// blue = document.querySelectorAll(".blueImg"),
// yellow = document.querySelectorAll(".yellowImg"),
// pink = document.querySelectorAll(".pinkImg");



// function handleBlueBtn(){
//     let itemArray = Array.from(item);
//     itemArray.length = 0;
//     item.classList.add("removeItem");
//     const blueArray = Array.from(blue);
//     itemArray = blueArray;
//     JSON.stringify(itemArray);
//     //console.log(itemArray);
//     item.appendChild(itemArray);
    
// }

// function handlePinkBtn(){
//     console.log(pink);
// }

// function handleYellowBtn(){
//     console.log(yellow);
// }   

// blueBtn.addEventListener("click", handleBlueBtn);
// pinkBtn.addEventListener("click", handlePinkBtn);
// yellowBtn.addEventListener("click", handleYellowBtn);
















// 2. JSON파일로부터 items를 동적으로 받아옴
function loadItems(){
    return fetch('data/data.json') // fetch라는 web api를 이용하면 데이터를 쉽게 받아올 수 있음(경로 써주면 됨) --> 404오류뜨면 server live로 실행해봐
    .then(response => response.json()) // fetch가 성공하면 reponse라는 object를 전달해줌
                        // --> reponse 오브젝트에 있는 json이라는 api를 이용해서
                        // reponse의 body를 json의 오브젝트로 변환
    .then(json => json.items); // json에 있는 items만 전달
}
// loadItems함수 정리
// fetch로 데이터를 받아옴 --> 받아온 데이터가 성공적이면 json으로 변환 --> json안에 있는 items 리턴함

// 3.받아온 items인자를 html 요소로 변환해서 페이지에 표기되도록 만드는 함수 
function displayItems(items) {
    const container = document.querySelector(".items");
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
    // items 안에는 json에서 정의한 각각의 object들이 있음
    // --> 그 object들을 html요소로 변환 (각각에 해당하는 item을 html의 li태그로 변환)
    // 이렇게 한가지 배열의 형태를 다른 형태의 배열로 변환하는것, 매핑하는것? --> map 이용!
    // 각각의 item을 createHTMLString함수를 이용해서 li요소로, 문자열로 변환(밑에 4번)
    // 4번(createHTMLString 함수)에서 만든 문자열을 하나의 큰 문자열로 만듦 --> join 이용!!
    // --> 즉, li들이 계속 반복해서 들어가있는 문자열로 변환 : 문자열이 들어있는 배열을 한가지의 문자열로 병합
    // 위의 과정들을 container에 innerHTML로 담겠다는 소리
}

// 4. 문자열 string 템플릿을 만듦(문자열 리턴함)
function createHTMLString(item){
    return `
    <li class="item">
        <img class="thumbNailImg" src = "${item.image}" alt = "${item.type}">
        <span class="itemText">${item.gender}, ${item.size}</span>
    </li>
    `;
}

// 5.
function setEventListeners(items) {
    const logo = document.querySelector('.head');
    const buttons = document.querySelector('.navBar'); // button이 들어있는 container자체에 이벤트 등록 (이벤트 위임)
    // 이벤트 위임 : 하나하나에 이벤트리스너를 반복하는 것 보다, 같은 것들이 들어있는 컨테이너에 이벤트리스너를 등록해서
    //              한 곳에서만 이벤트를 핸들링하는 것 (더 효율적임)
    logo.addEventListener('click', () => displayItems(items)); // logo가 선택되면 모든 아이템들이 보여짐
    buttons.addEventListener('click', event => onButtonClick(event, items)); // 버튼이 클릭되면 이벤트 처리함
                            // event가 발생한 애를 인자로 전달해주고 items도 전달해줌
}

// 6. 클릭될 때의 정보들을 이용해 items를 필터링 함
//    최종적으로 걸러진 items를 displayItems함수 호출해서 화면에 보여지도록 함
//    이 과정을 효율적으로 하기 위해, event 오브젝트 안에 우리가 원하는 정보를 넣음(html에서 custom property 이용)
function onButtonClick(event, items){ // 이벤트를 처리하는 함수는 'on어쩌고' 로 이름 붙힘
    // console.log(event.target.dataset.key);
    // console.log(event.target.dataset.value);
    const dataSet = event.target.dataset;
    const key = dataSet.key;
    const value = dataSet.value;

    if(key == null || value == null) {  //필터링할 수 있는 정보가 없다면
        return; // 아무것도 처리하지 않고 함수 끝냄
    }

    // 필터링할 데이터가 있다면 displayItems함수 호출
    displayItems(items.filter(item => item[key] === value));
    // 배열에서 특정데이터 추출해서 새롭게 작은 단위의 배열 만들땐? --> filter 이용
    // 오브젝트, 배열은 key를 이용해서 데이터에 접근할 수 있음
    // item의 key가 value와 같은 애만 displayItems로 전달
}

//data를 동적으로 읽어오려면 시간 걸림 --> promise 리턴하는 함수 사용
// 1. main (로직의 토대를 만듦)
loadItems()
.then(items => { // promise가 성공적으로 되면 items받아옴
    displayItems(items); // 받아온 items를 html에 보여줌, items를 함수에 전달?
    setEventListeners(items)  // 받아온 items에 적절한 이벤트를 줌 --> 적절하게 필터링
})  
.catch(console.log('there is an error')); //promise가 실패하면 에러메시지 보여주거나 리스트대신 적절한 경고문구 띄움(일단은 콘솔로 띄움)








// 위의 코드는 버튼이 클릭될 때마다 전체적인 리스트가 업데이트됨
// 이걸 개선하기 위한 코드 img/개선코드.png

// 개선코드
// 버튼이 클릭되면 해당하는 key, value를 updateItems함수 이용해서 처리

// updateItems 함수
// html요소가 들어있는 items배열을 뱅글뱅글 돌면서
// 해당하는 요소들만 class를 이용해서 보여지고, 보여지지 않고 하게 함
