let name = prompt("名前を入力してください");
let flag = true;
//プレイヤーデータ
let plyLv = 1;
let plyHp = 6;
let plyHpMax = 6;
let plyAtt = 1;
let plyHeal = 1;
let plyExp = 0;
let plyExpNext = 5;
let plyExpNeed = [5, 15, 50, 75, 100, 150, 200, 300];
let plyImg = document.getElementById("plyImg");
let plySt = new Array(7);
for (i = 0; i < 7; i++) {
  plySt[i] = document.getElementById("plySt" + i);
}
plySt0.textContent = name;

//プレイヤー回復
plyImg.addEventListener("mousedown", () => {
  if (flag) {
    plyImg.src = "img/playerC.png";
  }
});
plyImg.addEventListener("mouseup", () => {
  if (flag) {
    plyImg.src = "img/playerA.png";
    plyHp += plyHeal;
    if (plyHp > plyHpMax) {
      plyHP = plyHpMax;
    } else {
      plySt2.textContent = "HP:" + plyHp;
    }
  }
});
//敵データ
let eneLv = 1;
let eneHp = 10;
let eneHpMax = [10, 15, 20, 25, 30, 35, 40, 50, 55, 70];
let eneAtt = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
let eneAttSc = 2;
let eneKill = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let eneExp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let eneCnt = 5;
let eneCntMax = [5, 5, 5, 4, 4, 4, 3, 3, 3, 3];
let eneImg = document.getElementById("eneImg");
let eneNameAll = [
  "スライム",
  "コウモリ",
  "マウス",
  "スネーク",
  "オオカミ",
  "ゴブリン",
  "ゴースト",
  "ゾンビ",
  "メラ",
  "クマ",
];
let eneSt = new Array(5);
for (i = 0; i < 5; i++) {
  eneSt[i] = document.getElementById("eneSt" + i);
}
eneSt[0].textContent = eneNameAll[eneLv - 1];
//敵を攻撃する
eneImg.addEventListener("mousedown", () => {
  if (flag) {
    eneImg.src = "img/enemyB" + (eneLv - 1) + ".png";
  }
});
eneImg.addEventListener("mouseup", () => {
  if (flag) {
    eneImg.src = "img/enemyA" + (eneLv - 1) + ".png";
    if (eneHp > 0) {
      eneHp -= plyAtt;
    } else {
      //倒した数のカウント
      eneKill[eneLv - 1]++;
      eneSt4.textContent = "倒した回数:" + eneKill[eneLv - 1];
      //経験値の処理
      plyExp += eneExp[eneLv - 1];
      plySt5.textContent = "経験値" + plyExp;
      plyExpNext -= eneExp[eneLv - 1];
      //次の敵を出す
      eneLv++;
      if (eneLv > 10) {
        flag = false;
        document.getElementById("clear").style.display = "block";
      } else {
        eneImg.src = "img/enemyA" + (eneLv - 1) + ".png";
        eneHp = eneHpMax[eneLv - 1];
        eneAttSc = eneAtt[eneLv - 1];
        eneExp[0] = eneExp[eneLv - 1];
        eneCnt = eneCntMax[eneLv - 1];
        eneSt[0].textContent = eneNameAll[eneLv - 1];
        eneSt[1].textContent = "レベル:" + eneLv;
        eneSt[2].textContent = "HP:" + eneHp;
        eneSt[3].textContent = "攻撃力:" + eneAttSc;
        eneSt[4].textContent = "倒した回数:" + eneKill[eneLv - 1];
      }
      //レベルアップの処理
      if (plyExpNext <= 0) {
        plyExpNext = plyExpNeed[plyLv];
        plyLv++;
        plySt[1].textContent = "レベル:" + plyLv;
        plyHpMax = plyLv * 2 + 6;
        plyHp = plyHpMax;
        plySt[2].textContent = "HP:" + plyHp;
        plyAtt++;
        plySt[3].textContent = "攻撃力:" + plyAtt;
        plyHeal++;
        plySt[4].textContent = "回復魔法:" + plyHeal;
      }
      plySt[6].textContent = "次のレベルまでの経験値" + plyExpNext + "ポイント";
    }
    eneSt[2].textContent = "HP:" + eneHp;
  }
});
//敵が時間ごとに攻撃
let eneSec = document.getElementById("eneSec");
let loop = setInterval(() => {
  if (eneCnt && flag > 0) {
    eneCnt--;
    eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
  } else if (flag) {
    plyImg.src = "img/playerB.png";
    plyHp = plyHp - eneAtt[eneLv - 1];
    if (plyHp > 0) {
      plySt[2].textContent = "HP:" + plyHp;
      eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
    } else {
      plyHp = 0;
      clearInterval(loop);
      flag = false;
      plySt[2].textContent = "HP:" + plyHp;
      eneSec.textContent = "ゲームオーバー";
    }
    setTimeout(() => {
      if (flag) {
        eneCnt = eneCntMax[0];
        eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
        plyImg.src = "img/playerA.png";
      }
    }, 500);
  }
}, 1000);

//逃げる
let down = document.getElementById("left");
down.addEventListener("click", () => {
  if (flag) {
    eneLv--;
    eneImg.src = "img/enemyA" + (eneLv - 1) + ".png";
    eneHp = eneHpMax[eneLv - 1];
    eneAttSc = eneAtt[eneLv - 1];
    eneExp[0] = eneExp[eneLv - 1];
    eneCnt = eneCntMax[eneLv - 1];
    eneSt[0].textContent = eneNameAll[eneLv - 1];
    eneSt[1].textContent = "レベル:" + eneLv;
    eneSt[2].textContent = "HP:" + eneHp;
    eneSt[3].textContent = "攻撃力:" + eneAtt[eneLv - 1];
    eneSt[4].textContent = "倒した回数:" + eneKill[eneLv - 1];
  }
});

//次の敵
let up = document.getElementById("right");
up.addEventListener("click", () => {
  if (flag) {
    eneLv++;
    eneImg.src = "img/enemyA" + (eneLv - 1) + ".png";
    eneHp = eneHpMax[eneLv - 1];
    eneAttSc = eneAtt[eneLv - 1];
    eneExp[0] = eneExp[eneLv - 1];
    eneCnt = eneCntMax[eneLv - 1];
    eneSt[0].textContent = eneNameAll[eneLv - 1];
    eneSt[1].textContent = "レベル:" + eneLv;
    eneSt[2].textContent = "HP:" + eneHp;
    eneSt[3].textContent = "攻撃力:" + eneAtt[eneLv - 1];
    eneSt[4].textContent = "倒した回数:" + eneKill[eneLv - 1];
  }
});
