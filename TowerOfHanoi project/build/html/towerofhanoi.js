class HanoiTower { 
  constructor() {
    this.input_num = 0;
    this.memory_arr = [];   // total_arr이 횟수대로 담길 배열
    this.total_arr = [];   //매개변수로 start_count, support_count, target_count 받을 배열
    this.bar_count1= [];
    this.bar_count2 = [];
    this.bar_count3 = [];
    this.counter;
    this.text_input = [];
  }
  reset(){
    this.input_num = 0;
    this.total_arr = [];
    this.bar_count1= [];
    this.bar_count2 = [];
    this.bar_count3 = [];
    this.memory_arr = [];
    this.counter; 
    this. text_input = [];
  }
  //하노이 들어가는 숫자 입력받기. 및 입력받은 숫자로 
  input_hanoi_disk(start, input) {
    for(let i=0; i<input; i++) {
      start.push(input-i);    //역순으로 들어가서 밑에서부터 3,2,1순으로 생성됨. 
    }
  }
  //실행할 것.
  number_limit() {
    $("#input_number").on("keyup", ()=>{ 
      if(!/^[1-6]{1}$/.test($("#input_number").val())){
        $("#input_number").val("");
      }
    })
  }
  //실행할 것.
  input_check() {
    $("#confirm_button").click(() => {
      this.number_limit();
      this.input_num = $('#input_number').val();
      this.start_hanoi(this.bar_count1, this.bar_count2, this.bar_count3);
      this.input_hanoi_disk(this.bar_count1, this.input_num);
      this.total_arr = [this.bar_count1, this.bar_count2, this.bar_count3];
      this.disk_memory();
    })
  }
  ///////////////////////////////////////////////////////////////////////////
  //하노이의 탑이 돌아가는 형태 로직
  //실행할 것.
  start_hanoi(disk_count, start, target, support) { 
    if(disk_count == 1){ 
        let move_disk = start.pop();
        target.push(move_disk);
        this.get_disk_move(start, target);
    }
    if(disk_count >= 2){ 
      this.start_hanoi(disk_count-1, start, support, target);
      let move_disk = start.pop();
      target.push(move_disk);
      this.get_disk_move(start, target);
      this.start_hanoi(disk_count-1, support, target, start);
    }
  };
  ///////////////////////////////////////////////////////////////////////////
  //p로 출력하기 위한 로직
  get_disk_move(start, target) {
    this.counter++
    let start_num = 0;
    let target_num = 0;
    for(let i=0; i<this.total_arr.length; i++) {
      if(total_arr[i] == start) {
        start_num = i+1;
      }
      if(total_arr[i] == target) {
        target_num = i+1;
      }
    }
    console.log(this.counter + "회에서 " + start_num + "번 bar에서 " + target_num + "번 bar로 이동");
    text_input.push([this.counter, start_num, target_num]);
  }


  //p태그 만들기
  //실행할 것.
  output_text () {
    for(let i=0; i<this.text_input.length; i++) {
      setTimeout(() => {
        $("#inner_box").append(`<p class="append_text" id="append_text">${this.text_input[i][0]}번째 : ${this.text_input[i][1]}번 bar에서 ${this.text_input[i][2]}번 bar로 이동 </p>`);
        $("#inner_box").scrollTop($("#inner_box").prop("scrollHeight"));
      }, (i+1)*1000);
      if(i == this.text_input.length-1) {
        setTimeout("reset_data()", (i+1)*1100);  //전체 다 돌고나면 resetData로 여태까지 했던 값들을 전부 초기화 처리하는 것.
      };
    };
  };
  output_text_reset() { 
    $(".append_text").remove();
  };
  //디스크 생성 로직
  start_disk() {
    for(let i=0; i<input_num; i++) {
      $("#first_bar").append(`<div class="disk_box contain${i+1}" id="disk_box contain${i+1}"></div>`);
    }
  }
  disk_reset() {
    setTimeout(() => {
      $("#first_bar>div").remove();
    },1000)
    $("#third_bar>div").remove();
  }
  //디스크 생성 움직이기.
  //움직이기 전에 3중배열에 대한 정의 내려줄것.
  disk_memory(){
    for(i=0; i<this.total_arr.length; i++) {
      this.memory_arr.push([]);
    }
    for(i=0; i<this.total_arr.length; i++){
      for(j=0; j<this.total_arr[i].length; j++) {
        this.memory_arr[i].push(this.total_arr[i][j]);
      }
    }
    console.log(memory_arr);
  }


  disk_make() {

  }
  
  //중요한 키 포인트는 배열안에 각 단계별로 실행된 값들을 받아올 수 있어야함.










}

let main = (() => {
  const hanoi_tower = new HanoiTower();
})();




