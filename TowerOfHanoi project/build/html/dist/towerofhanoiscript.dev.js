"use strict";

//전역으로 처리할  것들  내용
var input_num = 0;
var counter = 0;
var total_arr = [[], [], []]; //사실상 total_list 랑 동일

var start_count = total_arr[0];
var support_count = total_arr[1];
var target_count = total_arr[2];
var flag_count = 0; //회수 계산할 때 쓸 전역 변수
// let total_list = [start_count, support_count, target_count]; // 클릭 시  실행

var text_input = []; //회수 계산시에 배열에 담아서 회, 몇번 바에서 몇번바로 이동하는 것 내용 포함
// let disk_total_list = [];

var memory_list = []; // 초기화 데이터

function reset_data() {
  input_num = 0;
  counter = 0;
  flag_count = 0;
  total_arr = [[], [], []];
  start_count = total_arr[0];
  support_count = total_arr[1];
  target_count = total_arr[2]; // total_list = [start_count, support_count, target_count]; 
  // output_text_reset();

  text_input = [];
  memory_list = [];
} //--------------------------------------------------------------------------
//1번!!!!
//하노이의 탑에 들어갈 숫자를 입력받기.


function input_hanoi_disk(start, input) {
  for (var i = 0; i < input; i++) {
    start.push(input - i);
  }

  ;
}

; //입력받는 숫자 ~6까지

function ban_number() {
  //인풋태그에 들어온 값을 받아오는 메소드
  $("#input_number").on("keyup", function () {
    //html 화면 표시가 가능한 개수를 1~6으로 설정했기 때문에
    //그외의 값이 들어오면 입력값 날리기
    if (!/^[1-6]{1}$/.test($("#input_number").val())) {
      $("#input_number").val("");
    }
  });
}

; //-----------------------------------------------------------------------------------
//2번!!!!!
//하노이의 탑이 돌아가는 형태 로직

function start_hanoi(disk_count, start_bar, target_bar, support_bar) {
  counter++;

  if (disk_count == 1) {
    var move_disk = start_bar.pop();
    target_bar.push(move_disk);
    get_bar_array(); // memory_list.push([start_bar, support_count, target_count]);

    get_disk_move(start_bar, target_bar); // console.log(start_bar, support_bar, target_bar);

    console.log(total_arr); // memory_list.push(total_arr);

    var second_array = [];

    for (var i = 0; i < total_arr.length; i++) {
      var third_array = [];

      for (var j = 0; j < total_arr[i].length; j++) {
        third_array.push(total_arr[i][j]);
      }

      second_array.push(third_array);
    }

    memory_list.push(second_array);
  }

  if (disk_count >= 2) {
    start_hanoi(disk_count - 1, start_bar, support_bar, target_bar);

    var _move_disk = start_bar.pop();

    target_bar.push(_move_disk);
    get_bar_array();
    get_disk_move(start_bar, target_bar); // console.log(start_bar, support_bar, target_bar);

    console.log(total_arr); // memory_list.push(total_arr);

    var _second_array = [];

    for (var _i = 0; _i < total_arr.length; _i++) {
      var _third_array = [];

      for (var _j = 0; _j < total_arr[_i].length; _j++) {
        _third_array.push(total_arr[_i][_j]);
      }

      _second_array.push(_third_array);
    }

    memory_list.push(_second_array); // console.log(start_bar, support_bar, target_bar);
    // memory_list.push([start_count, support_count, target_count]);

    start_hanoi(disk_count - 1, support_bar, target_bar, start_bar);
  }
}

; //하노이탑 내부 bar 출력하기(콘솔로 확인)

function get_bar_array() {
  console.log("1번 bar : " + start_count);
  console.log("2번 bar : " + support_count);
  console.log("3번 bar : " + target_count);
}

; //2-3번!!!!!!
//하노이의 탑 몇 번째에서 1,2,3번 bar에서 어떤 bar로 이동하는지.
//디스크 이동하는 순서에 대한 로직

function get_disk_move(start_bar, target_bar) {
  flag_count++;
  var start_num = 0; // let support_num = 0;

  var target_num = 0;

  for (var i = 0; i < total_arr.length; i++) {
    if (total_arr[i] == start_bar) {
      start_num = i + 1;
    } // if(total_list[i] == support_bar) {
    //   support_num = i+1;
    // }


    if (total_arr[i] == target_bar) {
      target_num = i + 1;
    }
  }

  console.log(flag_count + "회에서 " + start_num + "번 bar에서 " + target_num + "번 bar로 이동");
  text_input.push([flag_count, start_num, target_num]);
}

; //------------------------------------------------------------------------------------------
//3번!!!!!!!
//3-1번 : 본격적으로 p태그 만들어져서 안에 내용이 찍히기
// + 전체 리셋 되는 것도 여기서 설정하기(reset_data) ==> 왜냐하면 회수는 디스크나 p나 동일하니까 한번만 적용

var output_text = function output_text() {
  var _loop = function _loop(i) {
    setTimeout(function () {
      $("#inner_box").append("<p class=\"append_text\" id=\"append_text\">".concat(text_input[i][0], "\uBC88\uC9F8 : ").concat(text_input[i][1], "\uBC88 bar\uC5D0\uC11C ").concat(text_input[i][2], "\uBC88 bar\uB85C \uC774\uB3D9 </p>"));
      $("#inner_box").scrollTop($("#inner_box").prop("scrollHeight"));
    }, (i + 1) * 1000);

    if (i == text_input.length - 1) {
      setTimeout("reset_data()", (i + 1) * 1100); //전체 다 돌고나면 resetData로 여태까지 했던 값들을 전부 초기화 처리하는 것.
    }

    ;
  };

  for (var i = 0; i < text_input.length; i++) {
    _loop(i);
  }

  ;
}; //3-1번 : 실행버튼 누를때 text 리셋 되도록하기.


var output_text_reset = function output_text_reset() {
  $(".append_text").remove();
}; //-----------------------------------------------------------------------------------------
//4번!!!!!!
//4-1번 : input_number로 초기 원반 DISK 생성 로직


var start_disk = function start_disk() {
  for (var i = 0; i < input_num; i++) {
    $("#first_bar").append("<div class=\"disk_box contain".concat(i + 1, "\" id=\"disk_box contain").concat(i + 1, "\"></div>"));
  }
}; // 여기서 1초 간격으로 없애주면서 디스크 움직이는 로직이 실행.(디스크 움직이는 로직과 동일한 시간으로 설정할 것.)


var disk_reset = function disk_reset() {
  setTimeout(function () {
    $("#first_bar>div").remove();
  }, 1000);
  $("#third_bar>div").remove();
}; //4-2번 : 하노이 로직에 담긴 배열을 활용하여 각 bar에 생성되는 디스크를 설정한 것.
// ==> setTimeout을 활용해서 초당변화로 내용 형성.
//A디스크


var disk_make_A = function disk_make_A() {
  var _loop2 = function _loop2(i) {
    setTimeout(function () {
      $("#first_bar>div").remove();
    }, (i + 1) * 1000); //1초 간격으로 다음 배열로 넘어갈 때 기존에 있던 것을 1초 간격으로 없애야함.

    var _loop3 = function _loop3(j) {
      setTimeout(function () {
        $("#first_bar").append("<div class=\"disk_box contain".concat(memory_list[i][0][j], "\" id=\"contain").concat(memory_list[i][0][j], "\"></div>"));
      }, (i + 1) * 1000);
    };

    for (var j = memory_list[i][0].length - 1; j >= 0; j--) {
      _loop3(j);
    }
  };

  // console.log(memory_list[0][0]);
  for (var i = 0; i < memory_list.length; i++) {
    _loop2(i);
  }
}; //B디스크


var disk_make_B = function disk_make_B() {
  var _loop4 = function _loop4(i) {
    setTimeout(function () {
      $("#second_bar>div").remove();
    }, (i + 1) * 1000);

    var _loop5 = function _loop5(j) {
      setTimeout(function () {
        $("#second_bar").append("<div class=\"disk_box contain".concat(memory_list[i][1][j], "\" id=\"contain").concat(memory_list[i][1][j], "\"></div>"));
      }, (i + 1) * 1000);
    };

    for (var j = memory_list[i][1].length - 1; j >= 0; j--) {
      _loop5(j);
    }
  };

  for (var i = 0; i < memory_list.length; i++) {
    _loop4(i);
  }
}; //C디스크


var disk_make_C = function disk_make_C() {
  var _loop6 = function _loop6(i) {
    setTimeout(function () {
      $("#third_bar>div").remove();
    }, (i + 1) * 1000);

    var _loop7 = function _loop7(j) {
      setTimeout(function () {
        $("#third_bar").append("<div class=\"disk_box contain".concat(memory_list[i][2][j], "\" id=\"contain").concat(memory_list[i][2][j], "\"></div>"));
      }, (i + 1) * 1000);
    };

    for (var j = memory_list[i][2].length - 1; j >= 0; j--) {
      _loop7(j);
    }
  };

  for (var i = 0; i < memory_list.length; i++) {
    _loop6(i);
  }
}; //-----------------------------------------------------------------------
//5번!!!
//함수 실행순서에 따라 실행시키기.


var input_check = function input_check() {
  $("#confirm_button").click(function () {
    input_num = $('#input_number').val(); // 입력받는 값.

    output_text_reset(); //p태그 찍히는 것 reset 시키기

    disk_reset(); //원반 초기화 시키기.

    ban_number(); //input 넘버 값 수정(1~6까지만 입력되게 만드는 함수)

    input_hanoi_disk(start_count, input_num); //하노이 타워 실행시 시작 타워에 들어갈 원반 정의

    start_hanoi(input_num, start_count, target_count, support_count); // 하노이 타워 로직 실행

    start_disk(); //하노이 타워 그림 로직 실행

    console.log(memory_list);
    disk_make_A(); //원반 옮겨 다니는 로직 실행 

    disk_make_B(); //두번째 바에서 옮기는 로직

    disk_make_C(); //세번째 바에서 옮기는 로직

    output_text(); //p태그로 찍히게 만드는 로직  //settimeout 때문에 reset 데이터도 여기서 처리함.
    // reset_data();
    // input_num = 0;
  });
};

input_check(); //Reset 버튼 -> 리로드 이용(새로고침)

$("#reset_button").click(function () {
  location.reload();
});