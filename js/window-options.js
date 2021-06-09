export function loadWindowOptions(window, options) {
    if (options.AllowDragging) {
        allowWindowDragging(window);
    }

    if (options.AllowClosing) {
        allowWindowClosing(window);
    }

    if (options.AllowMaximize) {
        allowWindowMaximize(window);
    }

    if (options.AllowHideContent) {
        allowHidingContent(window);
    }

    if (options.AllowResize) {
        allowWindowResize(window);
    }
}

function allowHidingContent(window) {
    let arrowButton = window.innerHtml.querySelectorAll('img')[0];
    window.buttons['Arrow'] = arrowButton;
    arrowButton.addEventListener('click', function() {
        window.toggleContent();
    });
}

function allowWindowMaximize(window) {
    let maximizeButton = window.innerHtml.querySelectorAll('img')[2];
    window.buttons['Maximize'] = maximizeButton;
    window.header.addEventListener('dblclick', function() {
        window.maximizeWindow();
    });

    maximizeButton.addEventListener('click', function() {
        window.maximizeWindow();
    });
}

function allowWindowClosing(window) {
    let closeButton = window.innerHtml.querySelectorAll('img')[3];
    window.buttons['Close'] = closeButton;
    closeButton.addEventListener('click', closeWindow)

    function closeWindow(e) {
        window.close();
    }
}

function allowWindowDragging(window) {
    let posDiffX, posDiffY = 0;

    window.header.addEventListener('mousedown', dragMouseDown)

    function dragMouseDown(e) {
        e.preventDefault();

        posDiffX = e.clientX - window.position[0];
        posDiffY = e.clientY - window.position[1];

        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('mousemove', moveWindow);
    }

    function moveWindow(e) {
        e.preventDefault();

        if (window.maximized) {
            window.maximizeWindow();
        }

        window.position = [e.clientX - posDiffX, e.clientY - posDiffY];
    }

    function stopDragging() {
        document.removeEventListener('mouseup', stopDragging);
        document.removeEventListener('mousemove', moveWindow);
    }
}

function allowWindowResize(window) {
    let posDiffX, posDiffY, widthDiff, heightDiff = 0;
    let changeWidth, changeHeight = false;
    let changePositionX, changePositionY = false;

    window.border.addEventListener('mousedown', dragMouseDown)

    function dragMouseDown(e) {
        e.preventDefault();

        posDiffX = e.clientX - window.position[0];
        posDiffY = e.clientY - window.position[1];

        widthDiff = e.clientX - window.size[0] - window.position[0];
        heightDiff = e.clientY - window.size[1] - window.position[1];


        let pivot = e.target.dataset.pivot;
        changeWidth = pivot.includes('w');
        changeHeight = pivot.includes('h');
        changePositionX = pivot.includes('x');
        changePositionY = pivot.includes('y');

        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('mousemove', resizeWindow);
    }

    function resizeWindow(e) {
        e.preventDefault();
        let newSize = [window.size[0], window.size[1]]
        let newPosition = [window.position[0], window.position[1]]

        // window.position = [e.clientX - posDiffX, e.clientY - posDiffY];

        if (changeWidth) {
            newSize[0] = e.clientX - window.position[0] - widthDiff;
        }
        if (changeHeight) {
            newSize[1] = e.clientY - window.position[1] - heightDiff;
        }
        if (changePositionX) {
            newPosition[0] = e.clientX - posDiffX;
        }
        if (changePositionY) {
            newPosition[1] = e.clientY - posDiffY;
        }

        window.position = newPosition;
        window.size = newSize;
    }

    function stopDragging() {
        document.removeEventListener('mouseup', stopDragging);
        document.removeEventListener('mousemove', resizeWindow);
    }
}