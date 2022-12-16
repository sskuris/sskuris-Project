"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HanoiTower =
/*#__PURE__*/
function () {
  function HanoiTower() {
    _classCallCheck(this, HanoiTower);

    this.input_num = 0;
    this.memory_arr = []; // total_arr이 횟수대로 담길 배열

    this.total_arr = []; //매개변수로 start_count, support_count, target_count 받을 배열

    this.bar_count1 = [];
    this.bar_count2 = [];
    this.bar_count3 = [];
    this.counter;
    this.text_input = [];
  }

  _createClass(HanoiTower, [{
    key: "reset",
    value: function reset() {
      this.input_num = 0;
      this.total_arr = [];
      this.bar_count1 = [];
      this.bar_count2 = [];
      this.bar_count3 = [];
      this.memory_arr = [];
      this.counter;
      this.text_input = [];
    } //하노이 들어가는 숫자 입력받기. 및 입력받은 숫자로 

  }, {
    key: "input_hanoi_disk",
    value: function input_hanoi_disk(start, input) {
      for (var _i = 0; _i < input; _i++) {
        start.push(input - _i); //역순으로 들어가서 밑에서부터 3,2,1순으로 생성됨. 
      }
    } //실행할 것.

  }, {
    key: "number_limit",
    value: function number_limit() {
      $("#input_number").on("keyup", function () {
        if (!/^[1-6]{1}$/.test($("#input_number").val())) {
          $("#input_number").val("");
        }
      });
    } //실행할 것.

  }, {
    key: "input_check",
    value: function input_check() {
      var _this = this;

      $("#confirm_button").click(function () {
        _this.number_limit();

        _this.input_num = $('#input_number').val();

        _this.start_hanoi(_this.bar_count1, _this.bar_count2, _this.bar_count3);

        _this.input_hanoi_disk(_this.bar_count1, _this.input_num);

        _this.total_arr = [_this.bar_count1, _this.bar_count2, _this.bar_count3];

        _this.disk_memory();
      });
    } ///////////////////////////////////////////////////////////////////////////
    //하노이의 탑이 돌아가는 형태 로직
    //실행할 것.

  }, {
    key: "start_hanoi",
    value: function start_hanoi(disk_count, start, target, support) {
      if (disk_count == 1) {
        var move_disk = start.pop();
        target.push(move_disk);
        this.get_disk_move(start, target);
      }

      if (disk_count >= 2) {
        this.start_hanoi(disk_count - 1, start, support, target);

        var _move_disk = start.pop();

        target.push(_move_disk);
        this.get_disk_move(start, target);
        this.start_hanoi(disk_count - 1, support, target, start);
      }
    }
  }, {
    key: "get_disk_move",
    ///////////////////////////////////////////////////////////////////////////
    //p로 출력하기 위한 로직
    value: function get_disk_move(start, target) {
      this.counter++;
      var start_num = 0;
      var target_num = 0;

      for (var _i2 = 0; _i2 < this.total_arr.length; _i2++) {
        if (total_arr[_i2] == start) {
          start_num = _i2 + 1;
        }

        if (total_arr[_i2] == target) {
          target_num = _i2 + 1;
        }
      }

      console.log(this.counter + "회에서 " + start_num + "번 bar에서 " + target_num + "번 bar로 이동");
      text_input.push([this.counter, start_num, target_num]);
    } //p태그 만들기
    //실행할 것.

  }, {
    key: "output_text",
    value: function output_text() {
      var _this2 = this;

      var _loop = function _loop(_i3) {
        setTimeout(function () {
          $("#inner_box").append("<p class=\"append_text\" id=\"append_text\">".concat(_this2.text_input[_i3][0], "\uBC88\uC9F8 : ").concat(_this2.text_input[_i3][1], "\uBC88 bar\uC5D0\uC11C ").concat(_this2.text_input[_i3][2], "\uBC88 bar\uB85C \uC774\uB3D9 </p>"));
          $("#inner_box").scrollTop($("#inner_box").prop("scrollHeight"));
        }, (_i3 + 1) * 1000);

        if (_i3 == _this2.text_input.length - 1) {
          setTimeout("reset_data()", (_i3 + 1) * 1100); //전체 다 돌고나면 resetData로 여태까지 했던 값들을 전부 초기화 처리하는 것.
        }

        ;
      };

      for (var _i3 = 0; _i3 < this.text_input.length; _i3++) {
        _loop(_i3);
      }

      ;
    }
  }, {
    key: "output_text_reset",
    value: function output_text_reset() {
      $(".append_text").remove();
    }
  }, {
    key: "start_disk",
    //디스크 생성 로직
    value: function start_disk() {
      for (var _i4 = 0; _i4 < input_num; _i4++) {
        $("#first_bar").append("<div class=\"disk_box contain".concat(_i4 + 1, "\" id=\"disk_box contain").concat(_i4 + 1, "\"></div>"));
      }
    }
  }, {
    key: "disk_reset",
    value: function disk_reset() {
      setTimeout(function () {
        $("#first_bar>div").remove();
      }, 1000);
      $("#third_bar>div").remove();
    } //디스크 생성 움직이기.
    //움직이기 전에 3중배열에 대한 정의 내려줄것.

  }, {
    key: "disk_memory",
    value: function disk_memory() {
      for (i = 0; i < this.total_arr.length; i++) {
        this.memory_arr.push([]);
      }

      for (i = 0; i < this.total_arr.length; i++) {
        for (j = 0; j < this.total_arr[i].length; j++) {
          this.memory_arr[i].push(this.total_arr[i][j]);
        }
      }

      console.log(memory_arr);
    }
  }, {
    key: "disk_make",
    value: function disk_make() {} //중요한 키 포인트는 배열안에 각 단계별로 실행된 값들을 받아올 수 있어야함.

  }]);

  return HanoiTower;
}();

var main = function () {
  var hanoi_tower = new HanoiTower();
}();