const icon = document.getElementById('icon');
const moveSpeed = 5;  // アイコンの移動速度 (ピクセル/フレーム)
let iconPosition = { x: window.innerWidth / 2, y: (window.innerHeight * 4) / 5 };
const keysPressed = {};
let bullets = [];
let canShoot = true;
const maxBullets = 50;

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
        bullet.style.top = `${bulletTop - 10}px`;  // 10px/フレーム で移動

        // 弾が画面外に出た場合、削除
        if (bulletTop < 0) {
            bullet.remove();
            return false;  // 削除された弾をリストから除去
        }
        return true;
    });
}

// アイコンの初期位置を設定
updateIconPosition();
requestAnimationFrame(gameLoop);
