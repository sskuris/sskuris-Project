//전역으로 처리할  것들  내용
let input_num = 0;
let counter = 0;
let total_arr = [[],[],[]]   //사실상 total_list 랑 동일
let start_count = total_arr[0];
let support_count = total_arr[1];
let target_count = total_arr[2];
let flag_count = 0;   //회수 계산할 때 쓸 전역 변수
// let total_list = [start_count, support_count, target_count]; // 클릭 시  실행
let text_input = []; //회수 계산시에 배열에 담아서 회, 몇번 바에서 몇번바로 이동하는 것 내용 포함
// let disk_total_list = [];
let memory_list = [];

// 초기화 데이터
function reset_data() {
  input_num = 0;
  counter = 0;
  flag_count = 0;
  total_arr = [[],[],[]];
  start_count = total_arr[0];
  support_count = total_arr[1]; 
  target_count = total_arr[2];
  // total_list = [start_count, support_count, target_count]; 
  // output_text_reset();
  text_input = [];
  memory_list = [];
}

//--------------------------------------------------------------------------
//1번!!!!
//하노이의 탑에 들어갈 숫자를 입력받기.
function input_hanoi_disk(start, input) {
  for(let i=0; i<input; i++) {
    start.push(input-i);
  };
};
//입력받는 숫자 ~6까지
function ban_number() { //인풋태그에 들어온 값을 받아오는 메소드
  $("#input_number").on("keyup", ()=>{ 
    //html 화면 표시가 가능한 개수를 1~6으로 설정했기 때문에
    //그외의 값이 들어오면 입력값 날리기
    if(!/^[1-6]{1}$/.test($("#input_number").val())){
      $("#input_number").val("");
    }
  })
};

//-----------------------------------------------------------------------------------
//2번!!!!!
//하노이의 탑이 돌아가는 형태 로직
function start_hanoi(disk_count, start_bar, target_bar, support_bar) { 
  counter++
  if(disk_count == 1){ 
      let move_disk = start_bar.pop();
      target_bar.push(move_disk);
      get_bar_array();
      get_disk_move(start_bar, target_bar);
  }
  if(disk_count >= 2){ 
    start_hanoi(disk_count-1, start_bar, support_bar, target_bar);
    let move_disk = start_bar.pop();
    target_bar.push(move_disk);
    get_bar_array();
    start_hanoi(disk_count-1, support_bar, target_bar, start_bar);
  }};
//하노이탑 내부 bar 출력하기(콘솔로 확인)
function get_bar_array() {
  console.log("1번 bar : " + start_count);
  console.log("2번 bar : " + support_count);
  console.log("3번 bar : " + target_count);
};
//2-3번!!!!!!
//하노이의 탑 몇 번째에서 1,2,3번 bar에서 어떤 bar로 이동하는지.
//디스크 이동하는 순서에 대한 로직
function get_disk_move(start_bar, target_bar) {
  flag_count++
  let start_num = 0;
  let target_num = 0;
  for(let i=0; i<total_arr.length; i++) {
    if(total_arr[i] == start_bar) {
      start_num = i+1;
    }
    if(total_arr[i] == target_bar) {
      target_num = i+1;
    }
  }
  console.log(flag_count+ "회에서 " + start_num + "번 bar에서 " + target_num + "번 bar로 이동");
  text_input.push([flag_count, start_num, target_num]);
};

//------------------------------------------------------------------------------------------
//3번!!!!!!!
//3-1번 : 본격적으로 p태그 만들어져서 안에 내용이 찍히기
// + 전체 리셋 되는 것도 여기서 설정하기(reset_data) ==> 왜냐하면 회수는 디스크나 p나 동일하니까 한번만 적용
let output_text = () => {
  for(let i=0; i<text_input.length; i++) {
    setTimeout(() => {
      $("#inner_box").append(
        `<p class="append_text" id="append_text">${text_input[i][0]}번째 : ${text_input[i][1]}번 bar에서 ${text_input[i][2]}번 bar로 이동 </p>`
      );
      $("#inner_box").scrollTop($("#inner_box").prop("scrollHeight"));
    }, (i+1)*1000);
    if(i == text_input.length-1) {
      setTimeout("reset_data()", (i+1)*1100);  //전체 다 돌고나면 resetData로 여태까지 했던 값들을 전부 초기화 처리하는 것.
    };
  };
};
//3-1번 : 실행버튼 누를때 text 리셋 되도록하기.
let output_text_reset = () => { 
  $(".append_text").remove();
};

//-----------------------------------------------------------------------------------------
//4번!!!!!!
//4-1번 : input_number로 초기 원반 DISK 생성 로직
let start_disk = () => {
  for(let i=0; i<input_num; i++) {
    $("#first_bar").append(`<div class="disk_box contain${i+1}" id="disk_box contain${i+1}"></div>`);
  }
};
// 여기서 1초 간격으로 없애주면서 디스크 움직이는 로직이 실행.(디스크 움직이는 로직과 동일한 시간으로 설정할 것.)
let disk_reset = () => {
  setTimeout(() => {
    $("#first_bar>div").remove();
  },1000)
  $("#third_bar>div").remove();
};
//4-2번 : 하노이 로직에 담긴 배열을 활용하여 각 bar에 생성되는 디스크를 설정한 것.
// ==> setTimeout을 활용해서 초당변화로 내용 형성.
//A디스크
let disk_make_A = () => {
  // console.log(memory_list[0][0]);
  for(let i=0; i<memory_list.length; i++){
    setTimeout(()=>{ 
      $(`#first_bar>div`).remove(); 
    },(i+1)*1000); //1초 간격으로 다음 배열로 넘어갈 때 기존에 있던 것을 1초 간격으로 없애야함.
    for(let j=memory_list[i][0].length-1; j>=0; j--) {
      setTimeout(() => {
        $("#first_bar").append(`<div class="disk_box contain${memory_list[i][0][j]}" id="contain${memory_list[i][0][j]}"></div>`)
      },(i+1)*1000);
    } 
  }
}
//B디스크
let disk_make_B = () => {
  for(let i=0; i<memory_list.length; i++){
    setTimeout(()=>{ $(`#second_bar>div`).remove(); },(i+1)*1000);
    for(let j=memory_list[i][1].length-1; j>=0; j--) {
      setTimeout(() => {
        $("#second_bar").append(`<div class="disk_box contain${memory_list[i][1][j]}" id="contain${memory_list[i][1][j]}"></div>`)
      },(i+1)*1000);
    } 
  }
}
//C디스크
let disk_make_C = () => {
  for(let i=0; i<memory_list.length; i++){
    setTimeout(()=>{ $(`#third_bar>div`).remove(); },(i+1)*1000);
    for(let j=memory_list[i][2].length-1; j>=0; j--) {
      setTimeout(() => {
        $("#third_bar").append(`<div class="disk_box contain${memory_list[i][2][j]}" id="contain${memory_list[i][2][j]}"></div>`)
      },(i+1)*1000);
    }
  }
}

//-----------------------------------------------------------------------
//5번!!!
//함수 실행순서에 따라 실행시키기.
let input_check = () => {
  $("#confirm_button").click(() => {
    input_num = $('#input_number').val();   // 입력받는 값.
    output_text_reset();      //p태그 찍히는 것 reset 시키기
    disk_reset();             //원반 초기화 시키기.
    ban_number();             //input 넘버 값 수정(1~6까지만 입력되게 만드는 함수)
    input_hanoi_disk(start_count, input_num);                          //하노이 타워 실행시 시작 타워에 들어갈 원반 정의
    start_hanoi(input_num, start_count, target_count, support_count);  // 하노이 타워 로직 실행
    start_disk();             //하노이 타워 그림 로직 실행
    console.log(memory_list);
    disk_make_A();            //원반 옮겨 다니는 로직 실행 
    disk_make_B();            //두번째 바에서 옮기는 로직
    disk_make_C();            //세번째 바에서 옮기는 로직
    output_text();            //p태그로 찍히게 만드는 로직  //settimeout 때문에 reset 데이터도 여기서 처리함.
    // reset_data();
    // input_num = 0;
  });
};
input_check();

//Reset 버튼 -> 리로드 이용(새로고침)
$("#reset_button").click(() => {
  location.reload();
});