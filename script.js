const icon = document.getElementById('icon');
const moveSpeed = 5;  // アイコンの移動速度 (ピクセル/フレーム)
let iconPosition = { x: window.innerWidth / 2, y: (window.innerHeight * 4) / 5 };
const keysPressed = {};
let bullets = [];
let canShoot = true;
const maxBullets = 50;
let target ;

function init(){
    target = createTarget();
    requestAnimationFrame(gameLoop);
}

let targetPositionX = 0;
const targetSpeed = 3;  // 5px/フレームで移動

function updateTargetPosition() {
    targetPositionX += targetSpeed;

    // ターゲットが画面の右端を超えた場合、左端に戻る
    if (targetPositionX > window.innerWidth) {
        targetPositionX = -50;  // ターゲットの幅分だけ左に出て再出現
    }

    target.style.left = `${targetPositionX}px`;
}

// キーが押されたときの処理
document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
    if (event.key === ' ') {
        shootBullet();
    }
});

// キーが離されたときの処理
document.addEventListener('keyup', (event) => {
    keysPressed[event.key] = false;
});

function createTarget(){
    const ntarget = document.createElement('div');
    ntarget.style.position = 'absolute';
    ntarget.style.width = '50px';
    ntarget.style.height = '50px';
    ntarget.style.backgroundColor = 'peachpuff';  // 肌色に設定
    ntarget.style.top = `${window.innerHeight / 4}px`;  // 高さの1/4に配置
    ntarget.style.left = '0px';  // 画面の左端に初期配置
    document.body.appendChild(ntarget);
    targetPositionX = 0;
    return ntarget
}

// ゲームループ：毎フレームアイコンの移動を更新
function gameLoop() {
    if (keysPressed['ArrowUp']) {
        iconPosition.y -= moveSpeed;
    }
    if (keysPressed['ArrowDown']) {
        iconPosition.y += moveSpeed;
    }
    if (keysPressed['ArrowLeft']) {
        iconPosition.x -= moveSpeed;
    }
    if (keysPressed['ArrowRight']) {
        iconPosition.x += moveSpeed;
    }

    // アイコンが画面外に出ないように制限
    iconPosition.x = Math.max(0, Math.min(window.innerWidth - icon.offsetWidth, iconPosition.x));
    iconPosition.y = Math.max(0, Math.min(window.innerHeight - icon.offsetHeight, iconPosition.y));

    updateIconPosition();
    updateBullets();
    updateTargetPosition();

    requestAnimationFrame(gameLoop);
}

// アイコンの位置を更新する関数
function updateIconPosition() {
    icon.style.left = `${iconPosition.x}px`;
    icon.style.top = `${iconPosition.y}px`;
}

// 弾（丸）を発射する関数
function shootBullet() {
    if (!canShoot) return;

    canShoot = false;

    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    document.body.appendChild(bullet);

    // 弾の初期位置をアイコンの中央にセット
    bullet.style.left = `${iconPosition.x + icon.offsetWidth / 2 - 5 - 25}px`;  // アイコンの中央に配置
    bullet.style.top = `${iconPosition.y}px`;

    bullets.push(bullet);

    // 弾の最大数を超えたら古い弾から削除
    if (bullets.length > maxBullets) {
        const oldBullet = bullets.shift();
        oldBullet.remove();
    }

    setTimeout(() => {
        canShoot  = true;
    }, 1000);
}

// 弾を上に移動させ、画面外に出たら削除
function updateBullets() {
    bullets = bullets.filter((bullet) => {
        const bulletTop = parseInt(bullet.style.top);
        bullet.style.top = `${bulletTop - 10}px`;  // 10px/フレームで移動

        // 弾が画面外に出た場合、削除
        if (bulletTop < 0) {
            bullet.remove();
            return false;  // 削除された弾をリストから除去
        }

        // 当たり判定の処理
        if (isBulletInsideTarget(bullet, target)) {
            bullet.remove();  // 弾を消す
            target.remove();  // ターゲットを消す、または他の処理を入れる

            target = createTarget();
            return false;  // 当たった弾をリストから除去
        }

        return true;
    });
}

// 弾がターゲットの内側にあるかどうかを判定する関数
function isBulletInsideTarget(bullet, target) {
    const bulletRect = bullet.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    // 弾の中心座標を取得
    const bulletCenterX = bulletRect.left + bulletRect.width / 2;
    const bulletCenterY = bulletRect.top + bulletRect.height / 2;

    // 弾の中心がターゲットの矩形内にあるかを確認
    return (
        bulletCenterX >= targetRect.left &&
        bulletCenterX <= targetRect.right &&
        bulletCenterY >= targetRect.top &&
        bulletCenterY <= targetRect.bottom
    );
}

init();