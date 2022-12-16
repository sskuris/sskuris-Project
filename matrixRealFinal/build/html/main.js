//바탕화면 vanta 사용
VANTA.BIRDS({
  el: ".wraptotalBox",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  backgroundColor: 0xffffff,
  quantity: 3.00
})

// #matrixA_output
// 공간 안쪽에 필요한 만큼의 박스 갯수를 잡아와야한다.
// 1. input 사용해서 일단 값 받는 것 부터 확인하자. --> 받는 숫자 자리수 제한.
function handle_input(el, maxlength) {
  if(el.value.length > maxlength) {
    el.value = el.value.substr(0, maxlength);
  }
}
// A matrix Row
$("#upperNum_Abutton").click(() => {
  const number = ($("#matrixA_row").val());	
  console.log(number)	
  if(number==9){ 		
    $('#matrixA_row').val(1);
  }else{			
    const plus_num = parseInt(number) + 1;		
    console.log(plus_num);
    $('#matrixA_row').val(plus_num);
  }	
});

$("#lowerNum_Abutton").click(() => {
  const number = ($("#matrixA_row").val());	
  console.log(number)	
  if(number==1){ 		
    $('#matrixA_row').val(9);
  }else{			
    const minus_num = parseInt(number) - 1;		
    console.log(minus_num);
    $('#matrixA_row').val(minus_num);
  }	
});

// A matrix Column
$("#upperNum_Abutton_colume").click(() => {
  const number = ($("#matrixA_colume").val());	
  console.log(number)	
  if(number==9){ 		
    $('#matrixA_colume').val(1);
  }else{			
    const plus_num = parseInt(number) + 1;		
    console.log(plus_num);
    $('#matrixA_colume').val(plus_num);
  }	
});

$("#lowerNum_Abutton_colume").click(() => {
  const number = ($("#matrixA_colume").val());	
  console.log(number)	
  if(number==1){ 		
    $('#matrixA_colume').val(9);
  }else{			
    const minus_num = parseInt(number) - 1;		
    console.log(minus_num);
    $('#matrixA_colume').val(minus_num);
  }	
});

//B matrix Row
$("#upperNum_Bbutton").click(() => {
  const number = ($("#matrixB_row").val());	
  console.log(number)	
  if(number==9){ 		
    $('#matrixB_row').val(1);
  }else{			
    const plus_num = parseInt(number) + 1;		
    console.log(plus_num);
    $('#matrixB_row').val(plus_num);
  }	
});

$("#lowerNum_Bbutton").click(() => {
  const number = ($("#matrixB_row").val());	
  console.log(number)	
  if(number==1){ 		
    $('#matrixB_row').val(9);
  }else{			
    const minus_num = parseInt(number) - 1;		
    console.log(minus_num);
    $('#matrixB_row').val(minus_num);
  }	
});
// B matrix column
$("#upperNum_Bbutton_colume").click(() => {
  const number = ($("#matrixB_colume").val());	
  console.log(number)	
  if(number==9){ 		
    $('#matrixB_colume').val(1);
  }else{			
    const plus_num = parseInt(number) + 1;		
    console.log(plus_num);
    $('#matrixB_colume').val(plus_num);
  }	
});

$("#lowerNum_Bbutton_colume").click(() => {
  const number = ($("#matrixB_colume").val());	
  console.log(number)	
  if(number==1){ 		
    $('#matrixB_colume').val(9);
  }else{			
    const minus_num = parseInt(number) - 1;		
    console.log(minus_num);
    $('#matrixB_colume').val(minus_num);
  }	
});

// 2. output 버튼 클릭 메소드 + 클릭 시 값 들고와서 상자 만들기.
// output 버튼 클릭해도 값 날라성지 않게 하기.====> 기존에 처음 생성되는 로직 하나, 이후에 행과 열 입력 받아 추가시키는 로직으로 구성
// 조건문을 걸어서 input조건이 값이 있으면(0이나 null값 외의 값이 존재하면 empty실행하지 않는 컨셉으로 가면 되지 않을까?)
//아니면 기존에서 값을 놔두고 행과열의 갯수가 증가되거나 감소되는 경우에 추가시키는 컨셉으로 가면 어떨까?
//매트릭스A output
$("#matrixA_outputButton").on("click",outputCal);
function outputCal() {
  const inputValue_aRow = document.getElementById("matrixA_row").value;
  const inputValue_aColume = document.getElementById("matrixA_colume").value; 
  const inputValue_Arowchange = document.querySelectorAll("#innerBox_aRow").length;
  const inputValue_Acolumechange = document.querySelectorAll('.innerBox_aRow_1 #innerBox_aColume').length
  const inputValue_row = document.querySelector(".matrixA_row").value - document.querySelectorAll("#innerBox_aRow").length;
  const inputValue_colume = document.querySelector(".matrixA_colume").value - document.querySelectorAll('.innerBox_aRow_1 #innerBox_aColume').length;
  const inputValue_row2 = $('#innerBox_aRow').length - $(".matrixA_row").val();
  const inputValue_colume2 = $('.innerBox_aRow_1 #innerBox_aColume').length - $(".matrixA_colume").val();
  //처음에 생기는 상자 output
  if(document.querySelectorAll("#innerBox_aRow").length == 0 && document.querySelectorAll('.innerBox_aRow_1 #innerBox_aColume').length == 0) {
    let i=0;
    while(i<inputValue_aRow) {
      $('#matrixA_output').append(`<div class="innerBox_aRow_${i+1}" id="innerBox_aRow"></div>`);
      let j=0;
      while(j<inputValue_aColume) {
        $(`.innerBox_aRow_${i+1}`).append(`<input class="innerBox_aColume_${j+1}" id="innerBox_aColume"  type="text" value="0" oninput="handle_input(this, 4)">`);
        j++;
      }
      i++;
    }
  } else {
    //행 감소에 따른 로직
    if(inputValue_row < 0) {
      let rowCount = Math.abs(inputValue_row);
      console.log(rowCount)
      let i=0;
      while(i<rowCount) {
        $('#innerBox_aRow:last-child').remove(); 
        console.log(1)
        i++;
      }
    }
    //열 감소에 따른 로직
    if(inputValue_colume < 0) {
      let columeCount = Math.abs(inputValue_colume);
      console.log(columeCount)
      let i=0;
      while(i<columeCount) {
        $('#innerBox_aColume:last-child').remove();
        console.log(1)
        i++;
      }
    }
    //행만큼 늘어난 만큼 값이 들어오고, 열만큼 들어온 만큼 값이 늘어난다.
    //행 증가에 따른 값 가져오는 로직
    console.log(inputValue_row)      // 입력되어있는 값에서 기존에 있는 행의 갯수를 차감한 값 a -b
    console.log(inputValue_aRow)    // 받아오는 val 값 a        a-a-b b
    console.log(inputValue_Arowchange)   // 기존에 행값 변화 전에 산출되어져 있는 행의 갯수
    if(inputValue_row > 0) {
      let k=inputValue_Arowchange;
      let i = 0;
      while(k<inputValue_aRow) {
        $('#matrixA_output').append(`<div class="innerBox_aRow_${inputValue_Arowchange+i+1}" id="innerBox_aRow"></div>`);
        let l=0;
        while(l<inputValue_aColume) {
          $(`.innerBox_aRow_${inputValue_Arowchange+i+1}`).append(`<input class="innerBox_aColume_${l+1}" id="innerBox_aColume"  type="text" value="0" oninput="handle_input(this, 4)">`); 
          l++;
        }
        k++;
        i++;
      }
    }
    // 열 증가에 따른 로직
    console.log(inputValue_colume)// 입력되어있는 값에서 기존의 열의 개수를 차감한 값
    console.log(inputValue_aColume)  // 받아오는 val값
    console.log(inputValue_Acolumechange)  // 기존에 열 값 변화 전에 산출되어져 있던 열의 개수
    if(inputValue_colume > 0) {
      let i=0;
      while(i<inputValue_Arowchange) {
        let j=inputValue_Acolumechange 
        let p=0;
        while(j<inputValue_aColume){
          $(`.innerBox_aRow_${i+1}`).append(`<input class="innerBox_aColume_${inputValue_Acolumechange+p+1}" id="innerBox_aColume"  type="text" value="0" oninput="handle_input(this, 4)">`); 
          j++;
          p++;
        }
        i++;
      }
    }

  } 
}

// B 메트릭스 output
$("#matrixB_outputButton").on("click",outputCalB);
function outputCalB() {
  const inputValue_bRow = document.getElementById("matrixB_row").value;
  const inputValue_bColume = document.getElementById("matrixB_colume").value; 
  const inputValue_Browchange = document.querySelectorAll("#innerBox_bRow").length;
  const inputValue_Bcolumechange = document.querySelectorAll('.innerBox_bRow_1 #innerBox_bColume').length
  const inputValue_row = document.querySelector(".matrixB_row").value - document.querySelectorAll("#innerBox_bRow").length;
  const inputValue_colume = document.querySelector(".matrixB_colume").value - document.querySelectorAll('.innerBox_bRow_1 #innerBox_bColume').length;
  const inputValue_row2 = $('#innerBox_bRow').length - $(".matrixB_row").val();
  const inputValue_colume2 = $('.innerBox_bRow_1 #innerBox_bColume').length - $(".matrixB_colume").val();
  //처음에 생기는 상자 output
  if(document.querySelectorAll("#innerBox_bRow").length == 0 && document.querySelectorAll('.innerBox_bRow_1 #innerBox_bColume').length == 0) {
    let i=0;
    while(i<inputValue_bRow) {
      $('#matrixB_output').append(`<div class="innerBox_bRow_${i+1}" id="innerBox_bRow"></div>`);
      let j=0;
      while(j<inputValue_bColume) {
        $(`.innerBox_bRow_${i+1}`).append(`<input class="innerBox_bColume_${j+1}" id="innerBox_bColume"  type="text" value="0" oninput="handle_input(this, 4)">`);
        j++;
      }
      i++;
    }
  } else {
    //행 감소에 따른 로직
    if(inputValue_row < 0) {
      let rowCount = Math.abs(inputValue_row);
      console.log(rowCount)
      let i=0;
      while(i<rowCount) {
        $('#innerBox_bRow:last-child').remove(); 
        console.log(1)
        i++;
      }
    }
    //열 감소에 따른 로직
    if(inputValue_colume < 0) {
      let columeCount = Math.abs(inputValue_colume);
      console.log(columeCount)
      let j=0;
      while(j<columeCount) {
        $('#innerBox_bColume:last-child').remove(); 
        console.log(1)
        j++;
      }
    }

    //행만큼 늘어난 만큼 값이 들어오고, 열만큼 들어온 만큼 값이 늘어난다.
    //행 증가에 따른 값 가져오는 로직
    console.log(inputValue_row)      // 입력되어있는 값에서 기존에 있는 행의 갯수를 차감한 값 a -b
    console.log(inputValue_bRow)    // 받아오는 val 값 a        a-a-b b
    console.log(inputValue_Browchange)   // 기존에 행값 변화 전에 산출되어져 있는 행의 갯수
    if(inputValue_row > 0) {
      let k=inputValue_Browchange;
      let i = 0;
      while(k<inputValue_bRow) {
        $('#matrixB_output').append(`<div class="innerBox_bRow_${inputValue_Browchange+i+1}" id="innerBox_bRow"></div>`);
        let l=0;
        while(l<inputValue_bColume) {
          $(`.innerBox_bRow_${inputValue_Browchange+i+1}`).append(`<input class="innerBox_bColume_${l+1}" id="innerBox_bColume"  type="text" value="0" oninput="handle_input(this, 4)">`); 
          l++;
        }
        k++;
        i++;
      }
    }
    // 열 증가에 따른 로직
    console.log(inputValue_colume)// 입력되어있는 값에서 기존의 열의 개수를 차감한 값
    console.log(inputValue_bColume)  // 받아오는 val값
    console.log(inputValue_Bcolumechange)  // 기존에 열 값 변화 전에 산출되어져 있던 열의 개수
    if(inputValue_colume > 0) {
      let i=0;
      while(i<inputValue_Browchange) {
        let j=inputValue_Bcolumechange 
        let p=0;
        while(j<inputValue_bColume){
          $(`.innerBox_bRow_${i+1}`).append(`<input class="innerBox_bColume_${inputValue_Bcolumechange+p+1}" id="innerBox_bColume"  type="text" value="0" oninput="handle_input(this, 4)">`); 
          j++;
          p++;
        }
        i++;
      }
    }

  }
}


//3. random상자에 따른 값 산출 로직
// 매트릭스 A random
$("#matrixA_random").on("click",outputCal_random);
function outputCal_random() {
  $("#matrixA_output").empty();
  const inputValue_rowR = $("#matrixA_row").val();
  const inputValue_columeR = $("#matrixA_colume").val();
  let i=0;
  while(i<inputValue_rowR) {
    $('#matrixA_output').append(`<div class="innerBox_aRow_${i+1}" id="innerBox_aRow"></div>`);
    let j=0;
    while(j<inputValue_columeR) {
      $(`.innerBox_aRow_${i+1}`).append(`<input class="innerBox_aColume_${j+1}" id="innerBox_aColume"  type="text" min="1" max="999" oninput="handle_input(this, 4)">`);
      $(`.innerBox_aRow_${i+1} .innerBox_aColume_${j+1}`).attr(`value`, `${Math.floor(Math.random()*(999-(-999)+1))+(-999)}`);
      j++;
    }
    i++;
  }
}
//매트릭스 B random
$("#matrixB_random").on("click",outputCal_random2);
function outputCal_random2() {
  $("#matrixB_output").empty();
  const inputValue_rowR = $("#matrixB_row").val();
  const inputValue_columeR = $("#matrixB_colume").val();
  let i=0;
  while(i<inputValue_rowR) {
    $('#matrixB_output').append(`<div class="innerBox_bRow_${i+1}" id="innerBox_bRow"></div>`);
    let j=0;
    while(j<inputValue_columeR) {
      $(`.innerBox_bRow_${i+1}`).append(`<input class="innerBox_bColume_${j+1}" id="innerBox_bColume"  type="text" min="1" max="999" oninput="handle_input(this, 4)">`);
      $(`.innerBox_bRow_${i+1} .innerBox_bColume_${j+1}`).attr(`value`, `${Math.floor(Math.random()*(999-(-999)+1))+(-999)}`);
      j++;
    }
    i++;
  }
}

//4.Reset 버튼
// 메트릭스 A
$("#matrixA_reset").on("click",resetA);
function resetA() {
    const inputValue_aRow = document.getElementById("matrixA_row").value;
    const inputValue_aColume = document.getElementById("matrixA_colume").value; 
    $("#matrixA_output").empty();
    let i=0;
    while(i<inputValue_aRow) {
      $('#matrixA_output').append(`<div class="innerBox_aRow_${i+1}" id="innerBox_aRow"></div>`);
      let j=0;
      while(j<inputValue_aColume) {
        $(`.innerBox_aRow_${i+1}`).append(`<input class="innerBox_aColume_${j+1}" id="innerBox_aColume"  type="text" value="0" oninput="handle_input(this, 4)">`);
        j++;
      }
      i++;
    }
  //$("#matrixA_row").val('');
  //$("#matrixA_colume").val('');
}


// 메트릭스 B
$("#matrixB_reset").on("click",resetB);
function resetB() {
  const inputValue_bRow = document.getElementById("matrixB_row").value;
  const inputValue_bColume = document.getElementById("matrixB_colume").value; 
  $("#matrixB_output").empty();
  let i=0;
  while(i<inputValue_bRow) {
    $('#matrixB_output').append(`<div class="innerBox_bRow_${i+1}" id="innerBox_bRow"></div>`);
    let j=0;
    while(j<inputValue_bColume) {
      $(`.innerBox_bRow_${i+1}`).append(`<input class="innerBox_bColume_${j+1}" id="innerBox_bColume"  type="text" value="0" oninput="handle_input(this, 4)">`);
      j++;
    }
    i++;
  }
  //$("#matrixB_row").val('');
  //$("#matrixB_colume").val('');
}

//5. 연산에 따른 결과값 도출
// + 버튼
//행과 열이 맞아야만 계산이 실행되도록 만드는 함수

$("#plusButton").on("click",plusCal);
function plusCal() {
  if($(`.matrixA_row`).val() == $(`.matrixB_row`).val() && $(`.matrixA_colume`).val() == $(`.matrixB_colume`).val()) {
    if(document.querySelectorAll('.innerBox_aRow_1 #innerBox_aColume').length == $(`.matrixA_colume`).val() && document.querySelectorAll('.innerBox_bRow_1 #innerBox_bColume').length == $(`.matrixB_colume`).val()
    && document.querySelectorAll('#innerBox_aRow').length == $(`.matrixA_row`).val() && document.querySelectorAll('#innerBox_bRow').length == $(`.matrixB_row`).val()){
      location.href="#matrixRTitle";
      $("#matrixR_output").empty();
      const inputValue_row = $("#matrixA_row").val();
      const inputValue_colume = $("#matrixB_colume").val();
      let matrixA_rowR = $(`.matrixA_row`).val();
      let matrixB_columeR = $(`.matrixB_colume`).val();
      $(`.matrixR_row`).attr(`value`,`${matrixA_rowR}`);
      $(`.matrixR_colume`).attr(`value`,`${matrixB_columeR}`);
      let i=0;
      while(i<inputValue_row) {
        $('#matrixR_output').append(`<div class="innerBox_rRow_${i+1}" id="innerBox_rRow"></div>`);
        let j=0;
        while(j<inputValue_colume) {
          $(`.innerBox_rRow_${i+1}`).append(`<input class="innerBox_rColume_${j+1}" id="innerBox_rColume" type="text" oninput="handle_input(this, 4)" readonly>`);
          let matrixA_resultCal = $(`.innerBox_aRow_${i+1} .innerBox_aColume_${j+1}`).val();
          let matrixB_resultCal = $(`.innerBox_bRow_${i+1} .innerBox_bColume_${j+1}`).val(); 
          let matrixR_plusResult = Number(matrixA_resultCal)+Number(matrixB_resultCal);
          let result = matrixR_plusResult.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          $(`.innerBox_rRow_${i+1} .innerBox_rColume_${j+1}`).attr(`value`,`${result}`);
          j++;
        }
        i++;
      }
    } else {
      $("#alertBox").css({
        "top" : "50%"
      });
    }
  } else {
    $("#alertBox").css({
      "top" : "50%"
    });
  }
}
function checkOkay() {
  $("#alertBox").css({
    "top" : "-100vh"
  });
}
$("#alertBox").on("click", checkOkay);

// - 버튼
$("#minusButton").on("click",minusCal);
function minusCal() {
  if($(`.matrixA_row`).val() == $(`.matrixB_row`).val() && $(`.matrixA_colume`).val() == $(`.matrixB_colume`).val()) {
    if(document.querySelectorAll('.innerBox_aRow_1 #innerBox_aColume').length == $(`.matrixA_colume`).val() && document.querySelectorAll('.innerBox_bRow_1 #innerBox_bColume').length == $(`.matrixB_colume`).val()
    && document.querySelectorAll('#innerBox_aRow').length == $(`.matrixA_row`).val() && document.querySelectorAll('#innerBox_bRow').length == $(`.matrixB_row`).val()){
      location.href="#matrixRTitle";
      $("#matrixR_output").empty();
      const inputValue_row = $("#matrixA_row").val();
      const inputValue_colume = $("#matrixB_colume").val();
      let matrixA_rowR = $(`.matrixA_row`).val();
      let matrixB_columeR = $(`.matrixB_colume`).val();
      $(`.matrixR_row`).attr(`value`,`${matrixA_rowR}`);
      $(`.matrixR_colume`).attr(`value`,`${matrixB_columeR}`);
      let i=0;
      while(i<inputValue_row) {
        $('#matrixR_output').append(`<div class="innerBox_rRow_${i+1}" id="innerBox_rRow"></div>`);
        let j=0;
        while(j<inputValue_colume) {
          $(`.innerBox_rRow_${i+1}`).append(`<input class="innerBox_rColume_${j+1}" id="innerBox_rColume" type="text" oninput="handle_input(this, 4)" readonly>`);
          let matrixA_resultCal = $(`.innerBox_aRow_${i+1} .innerBox_aColume_${j+1}`).val();
          let matrixB_resultCal = $(`.innerBox_bRow_${i+1} .innerBox_bColume_${j+1}`).val(); 
          let matrixR_plusResult = Number(matrixA_resultCal)-Number(matrixB_resultCal);
          let result = matrixR_plusResult.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          $(`.innerBox_rRow_${i+1} .innerBox_rColume_${j+1}`).attr(`value`,`${result}`);
          j++;
        }
        i++;
      }
    } else {
      $("#alertBox").css({
        "top" : "50%"
      });
    }
  } else {
    $("#alertBox").css({
      "top" : "50%"
    });
  }
}


// X 버튼
$("#multiButton").on("click",multiCal);
function multiCal() {
  if($(`.matrixA_colume`).val() == $(`.matrixB_row`).val()) {
    if(document.querySelectorAll('.innerBox_aRow_1 #innerBox_aColume').length == $(`.matrixA_colume`).val() && document.querySelectorAll('.innerBox_bRow_1 #innerBox_bColume').length == $(`.matrixB_colume`).val()
      && document.querySelectorAll('#innerBox_aRow').length == $(`.matrixA_row`).val() && document.querySelectorAll('#innerBox_bRow').length == $(`.matrixB_row`).val()){
      location.href="#matrixRTitle";
      $("#matrixR_output").empty();
      const inputValue_Arow = $("#matrixA_row").val();
      const inputValue_Acolume = $("#matrixA_colume").val();
      const inputValue_Brow = $("#matrixB_row").val();
      const inputValue_Bcolume = $("#matrixB_colume").val();
  // 위에 행렬 결과값 도출 내용 a메트릭스 행, b메트릭스 열 result값 나타내기
      let matrixA_rowR = $(`.matrixA_row`).val();
      let matrixA_columeR = $(`.matrixA_colume`).val();
      let matrixB_rowR = $(`.matrixB_row`).val();
      let matrixB_columeR = $(`.matrixB_colume`).val();
      $(`.matrixR_row`).attr(`value`,`${matrixA_rowR}`);
      $(`.matrixR_colume`).attr(`value`,`${matrixB_columeR}`);
  //배열구조 잡기(A행렬, B행렬)    
      let matrixA_totalArray = [];
      let matrixB_totalArray = [];
  // A 매트릭스 배열
      let i=0;
      while(i<inputValue_Arow) {
        let matrixA_columeArray = [];
        let j=0;
        while(j<inputValue_Acolume) {
          let matrixA_resultCal = $(`.innerBox_aRow_${i+1} .innerBox_aColume_${j+1}`).val();
          matrixA_columeArray.push(`${matrixA_resultCal}`);
          j++;
        }
        i++;
        matrixA_totalArray.push(matrixA_columeArray);
      }
      // B 매트릭스 배열
      i=0;
      while(i<inputValue_Brow) {
        let matrixB_columeArray = [];
        let j=0;
        while(j<inputValue_Bcolume) {
          let matrixB_resultCal = $(`.innerBox_bRow_${i+1} .innerBox_bColume_${j+1}`).val();
          //console.log(matrixB_resultCal);
          matrixB_columeArray.push(`${matrixB_resultCal}`);
          j++;
        }
        i++;
        matrixB_totalArray.push(matrixB_columeArray);
      }
  // innerbox 생성
      i=0;
      while(i<inputValue_Arow) {
        $('#matrixR_output').append(`<div class="innerBox_rRow_${i+1}" id="innerBox_rRow"></div>`);
        let j=0;
        while(j<inputValue_Bcolume) {
          $(`.innerBox_rRow_${i+1}`).append(`<input class="innerBox_rColume_${j+1}" id="innerBox_rColume" type="text" min="1" oninput="handle_input(this, 4)" readonly>`);
          j++;
        }
        i++;
      }
  //배열 돌려서 작업 시작
      let matrixMulti = 0;
      let matrixMultiSum = 0;
      i=0;
      while(i<matrixA_totalArray.length){
        j=0;
        while(j<matrixB_totalArray[0].length){
          k=0;
          while(k<matrixB_totalArray.length){
            matrixMulti = matrixA_totalArray[i][k] * matrixB_totalArray[k][j];
            matrixMultiSum += matrixMulti;
            k++;
          }
          j++;
  //여기서 각각 innerbox 안에 넣어주는 작업이 필요하다.
          let result = matrixMultiSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          $(`.innerBox_rRow_${i+1} .innerBox_rColume_${j}`).attr(`value`,`${result}`);
          matrixMulti = 0;
          matrixMultiSum = 0;
        }
        i++;
      }
    } else { 
      $("#alertBox").css({
        "top" : "50%"
      });
    }
  } else {
    $("#alertBox").css({
      "top" : "50%"
    });
  }
}

// 숫자 0으로 시작하는 것 없애는 로직
/*function zeroRemove(vValue) {
	var vVal = vValue;
	if (vVal.length > 1) {
		vVal = vVal.replace(/^0/, "");
		if (vVal.length == 0) {
			vVal = 0;
		}
	} 
	return vVal;
} */

//late binding 생성된 요소(자바스크립트) / 객체 생성이 안되어도 요소를 잡아와서 event 작동 가능 / 문서 자체에 이벤트리스너를 주는데, 해당
$("body").on("keyup", "#innerBox_aColume", function(e){
  let regText = /^\-[1-9][0-9]{0,2}$|^[0-9]{1,3}$/;
    if(regText.test(e.target.value)){ 
        e.target.value = Number(e.target.value).toLocaleString("ko-KR");
        console.log(e.target.value) 
    }
    else if(!regText.test(e.target.value) && e.target.value != "-" ){
        e.target.value = "";
    }
});

$("body").on("keyup", "#innerBox_bColume", function(e){
  let regText = /^\-[1-9][0-9]{0,2}$|^[0-9]{1,3}$/;
    if(regText.test(e.target.value)){ 
        e.target.value = Number(e.target.value).toLocaleString("ko-KR");
        console.log(e.target.value)
    }
    else if(!regText.test(e.target.value) && e.target.value != "-"){
        e.target.value = "";
    }
});

$("body").on("keyup", "#innerBox_rColume", function(e){
  let regText = /^\-[1-9][0-9]{0,2}$|^[0-9]{1,3}$/;
    if(regText.test(e.target.value)){ 
        e.target.value = Number(e.target.value).toLocaleString("ko-KR");
        console.log(e.target.value) 
    }
    else if(!regText.test(e.target.value) && e.target.value != "-"){
        e.target.value = "";
    }
});
