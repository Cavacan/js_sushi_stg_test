let angle = 0;
const circle = document.querySelector('.circle');

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        angle += 90; // 右キーで90度回転
    } else if (event.key === 'ArrowLeft') {
        angle -= 90; // 左キーで90度回転
    }
    updateRotation();
});

function updateRotation() {
    circle.style.transform = `rotate(${angle}deg)`;
}
