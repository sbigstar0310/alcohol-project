/*
알콜 혈중농도 공식
C = (0.7A) / (10 * P * R)
C : 혈중농도 최고치
A : 운전자가 섭취한 알콜양
		(음주량 * 술의 농도 * 0.7984)
P : 사람 체중
R : 성별계수 (남: 0.7, 여: 0.6)

> 혈중 알콜 농도는 음주 후 90분까지 최대치.
> 혈중 알콜 농도는 최대치 이후 시간 당 0.008% 감소.

맥주: 355ml, 500ml 4.50%
소주: 360ml, 14%
막걸리: 750ml, 6%
*/

function printResult() {
  var R;
  var genderValue = document.querySelector(
    'input[name="gender"]:checked'
  ).value;
  if (genderValue === "male") {
    R = 0.7;
  } else {
    R = 0.6;
  }
  var P = document.getElementById("weight").value;
  var beer = document.getElementById("맥주").value;
  var soju = document.getElementById("소주").value;
  var makgeolli = document.getElementById("막걸리").value;
  var drinkTime = document.getElementById("drinkTime").value;
  var resultAlchol = document.getElementById("resultAlchol");
  var diffTime = getDiffTime(drinkTime);
  var boundery = 0.08;
  var A =
    (beer * 355 * 0.045 + soju * 360 * 0.14 + makgeolli * 750 * 0.06) * 0.7984;
  var C = (0.7 * A) / (10 * P * R);
  resultAlchol.innerText = calculPresentAlchol(C, diffTime);
  console.log("알콜 농도는: " + C);
  resultTime = calculAlchol(diffTime, C, boundery);
  printTime(resultTime);
}

function getDiffTime(drinkTime) {
  var timeNowDate = new Date();
  var timeDrinkDate = new Date(drinkTime);
  var diffTime = Math.round((timeNowDate - timeDrinkDate) / (1000 * 60));
  console.log("시간 차이는: " + diffTime);
  return diffTime;
}

function calculAlchol(diffTime, alchol, boundery) {
  var result;
  if (diffTime <= 90) {
    result = (60 / 0.008) * (alchol - boundery);
  } else {
    result =
      (60 / 0.008) * (alchol - boundery - (0.008 / 60) * (diffTime - 90));
  }
  console.log("운전 가능 시간은: " + Math.ceil(result));
  return Math.ceil(result);
}

function calculPresentAlchol(C, diffTime) {
  if (diffTime <= 90) {
    return C.toFixed(3);
  } else {
    let result = C - ((diffTime - 90) * 0.008) / 60;
    if (result < 0) {
      return 0;
    }
    return result.toFixed(3);
  }
}

function printTime(resultTime) {
  if (resultTime <= 0) {
    alert("지금 운전 가능합니다.");
    return;
  }
  alert(
    "운전 가능 시간은 " +
      Math.floor(resultTime / 60) +
      "시간 " +
      (resultTime % 60) +
      "분 이후입니다."
  );
}
