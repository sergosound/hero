document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.button');
    const sCount = document.querySelector('.counter_success').children.item(0);
    const fCount = document.querySelector('.counter_failed').children.item(0);

    button.addEventListener('click', start.bind(null, button));
    document.addEventListener('keydown', event => {
        createKeyBehavior(event, render.bind(null, sCount, fCount));
    });
});

const count = {
    success: 0,
    failed: 0,
}
const line_1 = {
    distance: 0,
    value: 80,
};
const line_2 = {
    distance: 0,
    value: 80,
};
const line_3 = {
    distance: 0,
    value: 80,
};

function createKeyBehavior(event, recount) {
    if (event.code === 'ArrowLeft') {
        if (line_1.distance < line_1.value) {
            count.success++;
        } else {
            count.failed++;
        }
    } else if (event.code === 'ArrowUp') {
        if (line_2.distance > line_2.value) {
            count.success++;
        } else {
            count.failed++;
        }
    } else if (event.code === 'ArrowRight') {
        if (line_3.distance > line_3.value) {
            count.success++;
        } else {
            count.failed++;
        }
    }
    recount();
}

function startLine(line, speed) {
    const interval = setInterval(() => {
        console.log(line.distance);
        if (line.distance === 100) {
            clearInterval(interval);
            startLine(line, speed);
        }
        line.distance++; // TODO check
    }, speed);
}

function linePass() {
    startLine(line_1, 1000);
    startLine(line_2, 2000);
    startLine(line_3, 5000);
}

function render(success, failed) {
    success.innerText = count.success;
    failed.innerText = count.failed;
}

function start(button) {
    linePass();
    button.removeEventListener('click', start);
    button.remove();
}