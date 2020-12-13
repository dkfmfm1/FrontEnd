const toDoForm = document.querySelector(".js-toDo"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

// 1. 로컬에서 이름 불러오기
// 2. 인풋에 할일 적으면 이벤트 일어나야됨. 그 이벤트 다뤄야됨
// 3. 이벤트 다루는 함수 작성
// 3-1 인풋의 value를 리스트로 만듦
// 3-2 value로 무언가를 해볼 함수를 불러오자
// 3-3 할일이 여러개이므로, 인풋 폼이 인풋 계속할수있도록 해야됨
// 4. value로 뭔가를 해볼 함수 만듦
// 5. 비어있는 배열 변수에 담음
// 6. 객체를 만들고 그 객체를 5번의 배열에 담음
// 7. 로컬스토리지에 배열 저장
// 8. 배열 저장하는 함수 호출
// 9. 로컬스토리지에 저장된 배열을 화면에 띄움

// 1
const TODOS_LS = "toDo";

// 5
let toDo = [];

function deleteToDo(event){
    // 어떤 리스트를 삭제할건지 알아야됨(li의 id로 찾음?)
    const li = event.target.parentNode;
    toDoList.removeChild(li);
    // 로컬스토리지에서도 삭제해야됨
    const cleanToDos = toDo.filter(function(toDo) {
        // 만약 id = 1인 애를 삭제했으면 li.id = 1임. 근데 1을 제외한 애들을 배열로 만들어야하므로
        // id가 1이 아닌 애들을 리턴하는거야
        return toDo.id !== parseInt(li.id);
    });
    toDo = cleanToDos;
    saveToDo();
}

// 7
function saveToDo(){
    // setItem("key", "value") : 해당 key로 value를 저장한다
    localStorage.setItem(TODOS_LS, JSON.stringify(toDo));
}

let idNum = 1;

// 4
function paintToDoList(text){
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "❌";
    // 화면상에서 리스트 삭제하기 위해, 버튼에 이벤트 리스너 추가(클릭시 deleteToDo 함수 실행)
    btn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    span.innerText = ` ${text}`;
    li.appendChild(btn);
    li.appendChild(span);
    const newId = idNum;
    idNum += 1;
    li.id = newId;
    toDoList.appendChild(li);

    // 6
    const toDoObj = {
        text : text,
        id : newId
    };
    toDo.push(toDoObj);
    // 8
    saveToDo();
}

// 3
function handleEvent(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDoList(currentValue);
    toDoInput.value = "";
}


// 9
function loadToDo(){
    // getItem("key") : 저장된 value값을 key로 가져온다.
    const loadToDo = localStorage.getItem(TODOS_LS);
    if(loadToDo !== null){
        const parseToDo = JSON.parse(loadToDo);
        parseToDo.forEach(function(toDo){
            paintToDoList(toDo.text);
        });
    }
}

function init(){
    loadToDo();
    // 2
    toDoForm.addEventListener("submit", handleEvent);
}

init();