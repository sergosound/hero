const line_1 = { distance: 0, value: 2 };
const line_2 = { distance: 0, value: 2 };
const line_3 = { distance: 0, value: 2 };
const count  = { success: 0, failed: 0 };

document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.button');
    const line1 = document.querySelector('.arrow_left');
    const line2 = document.querySelector('.arrow_up');
    const line3 = document.querySelector('.arrow_right');
    const sCount = document.querySelector('.counter_success').children.item(0);
    const fCount = document.querySelector('.counter_failed').children.item(0);
    let interval1, interval2, interval3;

    document.addEventListener('keydown', event => {
        createKeyBehavior(event, renderCount);
    });
    button.addEventListener('click', start);

    function createKeyBehavior(event, recount) {
        if (event.code === 'ArrowLeft') {
            if (line_1.distance === line_1.value) {
                count.success++;
                clearInterval(interval1);
                interval1 = startLine(line_1, line1, 1000);
            } else {
                count.failed++;
            }
        } else if (event.code === 'ArrowUp') {
            if (line_2.distance === line_2.value) {
                count.success++;
                clearInterval(interval2);
                interval2 = startLine(line_2, line2, 1000);
            } else {
                count.failed++;
            }
        } else if (event.code === 'ArrowRight') {
            if (line_3.distance === line_3.value) {
                count.success++;
                clearInterval(interval2);
                interval3 = startLine(line_3, line3, 1000);
            } else {
                count.failed++;
            }
        }
        recount();
    }

    function startLine(data, line, speed) {
        const interval = setInterval(() => {
            if (data.distance > 10) {
                data.distance = 0;
                clearInterval(interval);
                startLine(data, line, speed);
            }
            data.distance++; // TODO check

            if (data.value === data.distance) {
                line.style.backgroundColor = '#2cfc2c';
            } else {
                if (line.style.backgroundColor !== '#ff3030') {
                    line.style.backgroundColor = '#ff3030';
                }
            }
        }, speed);
        return interval;
    }

    function linePass() {
        interval1 = startLine(line_1, line1, 1000);
        interval2 = startLine(line_2, line2, 2000);
        interval3 = startLine(line_3, line3, 2500);
    }

    function renderCount() {
        sCount.innerText = count.success;
        fCount.innerText = count.failed;
    }

    function start() {
        linePass();
        button.removeEventListener('click', start);
        button.remove();
    }
});