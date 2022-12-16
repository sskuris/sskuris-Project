/**
 * 프로그램명 : 하노이 탑 
 * 작성자 : 박준영
 * 최종 수정일 : 10월02일 오전 11:54 
 */
class HanoiTower{ //하노이탑 클래스
  constructor(){ 
    this.inputNum = 0; //사용자한테 받을 값이 들어갈 변수
    this.stick1 = []; //첫번째 탑
    this.stick2 = []; //두번째 탑
    this.stick3 = []; //세번째 탑
    this.counter = 0; //총 반복 횟수
    this.hanoiList = []; //하노이탑이 담길 배열

    this.numInput(); //생성될시 사용자에게 입력받는 메소드 실행
    this.memoryArr = []; //이동 과정의 배열들이 저장될 배열
    this.memoryTextArr = []; //이동 과정의 텍스트가 저장될 배열 
    this.memoryIndex = 0; //시간차로 출력할때 사용할 메모리 인덱스
  }
  resetData(){ //사용자가 다시 입력할시 리셋해주는 메소드
    this.stick1 = [];
    this.stick2 = [];
    this.stick3 = [];
    this.counter = 0;
    this.memoryTextArr = [];
    $(".hanoiText p").remove(); //화면에 표시된 탑, 문자, 선 등등 삭제
    $(".hanoiText hr").remove();
  }
  startPush(start, count){ //시작 기둥 설정 메소드(시작할 기둥, 개수)
    for(let i = 0; i < count; i++){
      //시작 기둥(배열)에 입력 개수 만큼 숫자 형태로 원판 삽입
      start.push(count-i); 
    }
    console.log("---Start---");
    this.printStick(); //콘솔창에 현재 상태 출력(확인 용도)
    this.startDisk(); //html로 현재 상태 출력
    console.log("-----------");
    this.startHanoi(this.inputNum, this.stick1, this.stick3, this.stick2); //하노이 탑의 핵심 알고리즘을 갖는 메소드 실행
    console.log("----End----");
    this.printStick(); //콘솔창에 결과 상태 출력
    console.log("총 횟수: " + this.counter); //최종 반복 횟수 확인
    setTimeout(()=>{this.printMemory()}, 1500); 
    //메모리 배열에 쌓인 데이터를 시간차로 출력해주는 메소드를 실행
  }

  //***********하노이탑 핵심 알고리즘 *****************/
  //하노이탑(디스크, 시작기둥, 목표기둥, 보조기둥)
  startHanoi(diskCount, start, target, support){
    this.counter++; //최종 횟수 확인을 위한 카운터 변수 ++
    if(diskCount == 1){ //디스크가 하나인 경우
        let moveDisk = start.pop(); //시작기둥 맨위를 제거후
        target.push(moveDisk); //목표기둥에 추가
        this.printStick(); //기둥 상태 표시(콘솔창)
        this.printMove(start, target); //이동 경로 표시(콘솔창)
    }
    if(diskCount >= 2){ //2개 이상인 경우
      //해당 디스크의 위에 위치한 디스크를 옮기기 위해 -1번째 디스크에 
      //하노이탑 메소드 실행
      this.startHanoi(diskCount-1, start, support, target);
      let moveDisk = start.pop(); //실행한 하노이탑 메소드 이후 이동
      target.push(moveDisk);
      this.printStick();
      this.printMove(start, target);
      //보조기둥의 덩어리를 옮기기 위한 하노이탑 메소드 실행
      //시작 기둥값으로 보조기둥값을 주는게 핵심
      //밑의 디스크를 목표 기둥으로 옮기면 보조 기둥에 n-1이 쌓이는걸 이용
      this.startHanoi(diskCount-1, support, target, start);
    } 
  }
  printStick(){ //콘솔창에 스틱의 현재 상태를 표시하는 메소드
    console.log("stick1 : " + this.stick1);
    console.log("stick2 : " + this.stick2);
    console.log("stick3 : " + this.stick3);
  }
  printMove(start, target){ //디스크의 이동 경로를 표시하는 메소드
    //시작기둥과 목표기둥을 받아와서 사용
    let startNum = 0;
    let targetNum = 0;
    for(let i = 0; i < 3; i++){ //반복문 돌려서 기둥이 일치하면
      if(this.hanoiList[i] == start){ //해당 기둥의 번호를 가져옴
        startNum = i+1; 
      }
      if(this.hanoiList[i] == target){
        targetNum = i+1;
      }
    }
    console.log(startNum + "번째 기둥에서 " + targetNum + "번째 기둥으로 이동"); //기둥 이동 콘솔창에 표시
    console.log("-----------------------");
    //기둥 이둥 과정을 텍스트 형태로 저장해서 메모리 배열에 추가
    let str = `${startNum}번째 기둥에서 ${targetNum}번째 기둥으로 이동`;
    this.inputMemory(str); //모든 단계를 메모리에 저장하는 메소드
  }
  //----------여기까지가 하노이 로직. 아래는 원판 이동 장면 연출 등-------
  numInput(){ //인풋태그에 들어온 값을 받아오는 메소드
    $("#inputNum").on("keyup", ()=>{ 
      //html 화면 표시가 가능한 개수를 1~6으로 설정했기 때문에
      //그외의 값이 들어오면 입력값 날리기
      if(!/^[1-6]{1}$/.test($("#inputNum").val())){
        $("#inputNum").val("");
      }
    });
    $(".inputButton").on("click", ()=>{ 
      //입력 버튼 클릭시 하노이 로직 실행
      this.inputNum = parseInt($("#inputNum").val());
      this.hanoiList = [this.stick1, this.stick2, this.stick3];
      this.startPush(this.stick1, this.inputNum);
    });
    $(window).on("keyup", (e)=>{
      if(e.keyCode == 13){
        this.inputNum = parseInt($("#inputNum").val());
        this.hanoiList = [this.stick1, this.stick2, this.stick3];
        this.startPush(this.stick1, this.inputNum);
      }
    });
  }
  startDisk(){ //디스크를 화면에 보여주기 위한 메소드
    this.memoryArr = [];
    this.memoryIndex = 0;
    for(let i = 0; i<3; i++){
      $(`.stick${i+1} .floor`).remove();
    }
    for(let i = 0; i<3; i++){ 
      for(let j = 0; j<this.hanoiList[i].length; j++){
        $(`.stick${i+1}`).append(`<div class='floor diskNum${this.hanoiList[i][j]}'><div>`);
      }
    } 
  }
  inputMemory(str){ //단계별 진행상황을 배열에 저장하는 메소드
    //진행 상황을 문자열 변수에 담은 값을 인자값으로 받음
    this.memoryArr.push([]); //메모리 배열 자리 만들기
    for(let i = 0; i<this.hanoiList.length; i++){
      this.memoryArr[this.memoryIndex].push([]); 
    }
    //현재 진행 상태의 하노이탑들을 메모리 배열에 추가
    for(let i = 0; i<this.hanoiList.length; i++){
      for(let j = 0; j<this.hanoiList[i].length; j++){
        this.memoryArr[this.memoryIndex][i].push(this.hanoiList[i][j]);
      }
    }
    this.memoryIndex++; // 인덱스 ++
    this.memoryTextArr.push(str); //텍스트 메모리도 추가  
  }
  printMemory(){ //저장된 메모리를 시간차로 출력해주는 메소드
    //이건 화면에 디스크를 출력해주는 과정
    for(let i = 0; i<this.memoryArr.length; i++){
      setTimeout(()=>{
        let result = this.memoryArr[i]; //메모리 스틱1, 2, 3
        for(let i = 0; i<3; i++){
          //기존에 화면에 출력된 디스크들 제거
          $(`.stick${i+1} .floor`).remove(); 
        }
        for(let i = 0; i<3; i++){
          for(let j = 0; j<result[i].length; j++){
            //새롭게 디스크 추가 (그냥 저장된 개수만큼 자식 추가하면됨)
            $(`.stick${i+1}`).append(`<div class='floor diskNum${result[i][j]}'><div>`);
          }
        } 
      }, (1000 * i)); //시간차를 주기위해 i만큼 곱해줌.
    }
    this.memoryTextArr.forEach((v, i, a)=>{ //이건 문자메모리 출력
      //위와 동일한 과정
      //그냥 고차원 배열을 한번 사용해봤음
      setTimeout(()=>{
        //화면에 이동 과정 출력
        $(".hanoiText").append("<hr>");
        $(".hanoiText").append(`<p>${i+1}회 반복</p>`);
        $(".hanoiText").append("<p class='printText'></p>");
        $(".printText:last-child").text(a[i]);
        $(".hanoiText").scrollTop($(".hanoiText").prop("scrollHeight"));
      }, (1000 * i));
    });
    let memoryCount = this.counter;
    setTimeout(()=>{
      $(".hanoiText").append("<hr>");
      $(".hanoiText").append(`<p>총 반복 횟수 : ${memoryCount}회</p>`);
    }, (1000 * this.counter));
    this.resetData(); 
    //전부 출력하고 리셋해서 새로 입력할 경우 깨끗한 메모리 상태로 시작
  }
}
let main = (()=>{ //코드를 전개할 메인 영역
  let hanoi = new HanoiTower(); //하노이 생성

  class MenuControl{ //초기 메뉴 화면 관련 클래스
    constructor(){
      this.qmode = 0; //설명창이 열려있는 경우 1
      this.lmode = 0; //라이트 모드가 켜져있는 경우 1
      this.buttonClick();
    }
    buttonClick(){ //버튼 클릭 이벤트 관리 메소드
      //설명문 클릭시
      $(".qnaButton, .qnaArea").on("click", ()=>{ 
        if(this.qmode == 0){
          $(".qnaArea").css({"left":"50%"});
          this.qmode = 1;
        }
        else{
          $(".qnaArea").css({"left":"150%"});
          this.qmode = 0;
        }
      });
      //모드 변경 클릭시
      $(".modeButton").on("click", ()=>{
        if(this.lmode == 0){
          this.lmode = 1;
          $(".backArea").css({"background-image" : "url('../css/img/background2.jpg')"});
          $(".contentArea").css({"background-image" : "url('../css/img/lightMode.gif')"});
          $(".gameTitle").css({"text-shadow":"2px 3px 6px skyblue"});
          $(".startButton, .qnaButton, .modeButton").css({"background-color":"rgba(129, 203, 255, 0.332)", "box-shadow":"inset 1px 1px 3px 2px rgb(167, 192, 257)", "text-shadow":"1px 1px 2px rgb(115, 203, 225)"});
          $(".modeButton").text("다크 모드");
        }
        else{
          this.lmode = 0;
          $(".backArea").css({"background-image" : "url('../css/img/background.jpg')"});
          $(".contentArea").css({"background-image" : "url('../css/img/darkMode.gif')"});
          $(".gameTitle").css({"text-shadow":"2px 3px 6px rgb(255, 53, 255)"});
          $(".buttonArea div").css({"background-color":"rgba(245, 129, 255, 0.332)", "box-shadow":"inset 1px 1px 3px 2px rgb(167, 92, 157)", "text-shadow":"1px 1px 2px rgb(255, 53, 255)"});
          $(".modeButton").text("라이트 모드");
        }
      });
      $(".buttonArea div").on("mouseover", (e)=>{
        if(this.lmode == 0){
          $(e.target).css({"background-color":"rgba(229, 77, 253, 0.777)"});
        }
        else{
          $(e.target).css({"background-color":"rgba(129, 203, 255, 0.732)"}); 
        }
      });
      $(".buttonArea div").on("mouseout", (e)=>{
        if(this.lmode == 0){
          $(e.target).css({"background-color":"rgba(245, 129, 255, 0.332)"});
        }
        else{
          $(e.target).css({"background-color":"rgba(119, 177, 253, 0.332)"}); 
        }
      });
      $(".startButton").on("click", ()=>{
        $(".buttonArea").css("left", "-50%");
        // $(".gameTitle").css("margin-left", "-150%");
        $(".hanoiArea").css({"left":"50%"});
      });
      $(".upButton").on("click", ()=>{
        $(".hanoiText").scrollTop(0);
      });
    }
  }
  const menuControl = new MenuControl(); //메뉴 클래스 실행
})();