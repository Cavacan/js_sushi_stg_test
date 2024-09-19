// ターゲットの初期設定
const target = document.createElement('div');
target.style.position = 'absolute';
target.style.width = '50px';
target.style.height = '50px';
target.style.backgroundColor = 'peachpuff';  // 肌色に設定
target.style.top = `${window.innerHeight / 4}px`;  // 高さの1/4に配置
target.style.left = '0px';  // 画面の左端に初期配置
document.body.appendChild(target);

let targetPositionX = 0;
const targetSpeed = 5;  // 5px/フレームで移動

export function updateTargetPosition() {
    targetPositionX += targetSpeed;

    // ターゲットが画面の右端を超えた場合、左端に戻る
    if (targetPositionX > window.innerWidth) {
        targetPositionX = -50;  // ターゲットの幅分だけ左に出て再出現
    }

    target.style.left = `${targetPositionX}px`;
}
