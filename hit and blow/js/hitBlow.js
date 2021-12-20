function startGame() {
  // tạo mảng rổng gồm 4 phần tử
  answerNum = ["*", "*", "*", "*"];
  turn = 1;
  // lấy số phàn tử dưới dạng đối tượng
  dispNum = document.getElementById("choiceNumber");
  // đặt innner text để hiển thị
  dispNum.innerText = answerNum[0] + answerNum[1] + answerNum[2] + answerNum[3];
  // sau khi nhấn nút bắt đầu thì ẩn nút
  document.getElementById("startBtn").style.visibility = "hidden";
  selectNumber();
}

// chức năng thực hiện ramdom 0 - 9
function selectNumber() {
  do {
    // tạo mảng số ngẩu nhiên 0-9
    let numberList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    // chọn số ngẩu nhiên
    for (let i = 0; i < 4; i++) {
      // lấy 4 số ngẩu nhiên
      let ran = Math.floor(Math.random() * numberList.length);
      // sau khi lấy 4 sô thì bằng questionNum
      questionNum[i] = numberList[ran];
      // lấy 4 xong r xóa tránh trường hợp bị lặp
      numberList.splice(ran, 1);
    }
  } while (questionNum[0] == 0); // nếu bằng 0 thì lấy lại
  // hiển thị sô ramdom qua log
  console.log(questionNum);
}

// thực hiện chức năng nhập
function buttonClick(obj) {
  let pushNumber = obj.target.textContent;
  // obj là đại diện đối tượng
  // key là giá trị của đối tượng obj
  // nếu phím nhấn enter thì xử lí hit blow xem kết quả
  if (pushNumber == "Enter") {
    hit_blow();
  }
  // nếu phím nhấn delete thì quay lại mảng mặc định phần tử *
  if (pushNumber == "Delete" || pushNumber == " ") {
    answerNum = ["*", "*", "*", "*"];
    dispNum.innerText =
      answerNum[0] + answerNum[1] + answerNum[2] + answerNum[3];
    return;
  }
  // key có thể là chuổi kí tự.
  // true thì key là 1 đối số(chính xác là 1 chuổi số)
  // false thì chuyển kí tự thành đối số
  if (Number.isInteger(Number(pushNumber)) == false) {
    return;
  }
  // nhập từng giá trị vào * = giá trị từ bán phím
  if (answerNum.indexOf("*") != -1) {
    answerNum[answerNum.indexOf("*")] = pushNumber;
    dispNum.innerText =
      answerNum[0] + answerNum[1] + answerNum[2] + answerNum[3];
  }
}

// thực hiện chức năng hit_blow
function hit_blow() {
  if (answerNum[3] == "*") {
    return;
  }
  hit = 0;
  blow = 0;
  for (let i = 0; i < 4; i++) {
    // đúng số hit + 1. nếu câu trả lời trùng vs với số ramdom
    if (answerNum[i] == questionNum[i]) {
      hit += 1;
    }
    // sai thì blow +1. nếu không khớp với số ramdom
    else if (questionNum.indexOf(answerNum[i]) != -1) {
      blow += 1;
    }
  }
  // tạo biến string vừa nhập
  let string = answerNum[0] + answerNum[1] + answerNum[2] + answerNum[3];
  let kq = document.createElement("div");

  // trả kết quả
  kq.innerText = " - "+ turn + " kết quả vừa nhập [ " + string +" ]　" + hit + " H "+ " / " + blow + " B";
  field.appendChild(kq);

  // nếu kq hit băng 4 thì hiện thông báo cho ng chơi đã đúng
  if (hit == 4) {
    window.alert("Congratulation!");
    // trả về mảng phẩn tử rổng và hiện lại nút button
    document.getElementById("startBtn").style.visibility = "visible";
    field.innerText = "";
    answerNum = ["", "", "", ""];
    dispNum.innerText =
      answerNum[0] + answerNum[1] + answerNum[2] + answerNum[3];
  } else {
  // nếu chưa đúng tiếp tục dự đoán tiếp. trả mảng về *
    turn += 1;
    answerNum = ["*", "*", "*", "*"];
    dispNum.innerText =
      answerNum[0] + answerNum[1] + answerNum[2] + answerNum[3];
    return;
  }
}
