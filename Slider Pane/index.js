(function () {

    var right = document.getElementById('right');
    var left = document.getElementById('left');

    var items = document.getElementById('listitems');

    var number = items.children.length;

    var listitems = document.querySelectorAll('#listitems li');

    var currentLi = null;
    var chlen = listitems[0].getBoundingClientRect().width;

    var setImage = document.getElementById('setImage')
    items.style.width = (chlen * number) + 'px';


    var description = document.querySelector('.description');
    var galleryLink = document.getElementById('galleryLink');
    var movecount = 0;

    var flagMove = 0;

    var movebtn = document.getElementById('movebtn');

    function moveleft() {

        //Toggle to stop from moving when buttons are press
        if (flagMove == 0) {
            movebtn.innerHTML = 'Play';
            window.clearInterval(t);
        }
        if (flagMove == 1) {
            flagMove = 0;
        }


        var items = document.getElementById('listitems');
        var listitems = document.querySelectorAll('#listitems li');
        var ol = items.style.left;

        if (ol === '') {
            ol = 0;

        }
        else {
            ol = parseInt(ol, 10);
        }

        if (movecount === number - 3) {

            var items = document.getElementById('listitems');
            var listitems = document.querySelectorAll('#listitems li');
            items.append(listitems[0]);

            ol = ol + chlen;
            items.style.transition = "left 0s";
            items.style.left = ol + 'px';
            window.setTimeout(moveLeftHandler, 0);

        }
        else {



            ol -= chlen;

            items.style.left = ol + 'px';
            movecount++;
        }
    }


    function moveright() {
        movebtn.innerHTML = 'Play';
        window.clearInterval(t);
        var items = document.getElementById('listitems');
        var listitems = document.querySelectorAll('#listitems li');
        var ol = items.style.left;
        if (ol === "") {
            ol = 0;

        }
        else {
            ol = parseInt(ol, 10);
        }


        if (movecount === 0) {
            var items = document.getElementById('listitems');
            var listitems = document.querySelectorAll('#listitems li');


            items.insertBefore(listitems[listitems.length - 1], listitems[0]);
            items.style.transition = 'left 0s';
            ol = ol - chlen;
            items.style.left = ol + 'px';
            window.setTimeout(moveRightHandler, 0);
        }

        else {
            ol += chlen;

            items.style.left = ol + 'px';
            movecount--;
        }



    }

    function moveLeftHandler() {
        var ol = items.style.left;
        if (ol === "") {
            ol = 0;

        }
        else {
            ol = parseInt(ol, 10);
        }
        ol = ol - chlen;
        items.style.transition = 'left 0.2s';
        items.style.left = ol + 'px';
    }
    function moveRightHandler() {
        var ol = items.style.left;
        if (ol === "") {
            ol = 0;

        }
        else {
            ol = parseInt(ol, 10);
        }
        ol = ol + chlen;
        items.style.transition = 'left 0.2s';
        items.style.left = ol + 'px';
    }

    function handleImage() {
        //debugger;        
        var clickElement = window.event.srcElement;
        currentLi = clickElement;
        var i = parseInt(currentLi.getAttribute('id'), 10);
        if (i == 8) {
            //debugger;
            setImage.src = "C:/Users/saitalluri/Pictures/Images/image" + i + ".png";
            galleryLink.href = "#A8";
            galleryLink.innerHTML = "Anaximandor";
            description.innerHTML = "Anaximander was a pre-Socratic Greek philosopher who lived in Miletus,a city of Ionia (in modern-day Turkey)."
        }
        else {
            setImage.src = "C:/Users/saitalluri/Pictures/Images/image" + i + ".jpg";
            setLink(i);
        }
    }
    function setLink(i) {
        if (i == 1) {
            galleryLink.href = "#A1";
            galleryLink.innerHTML = "Socrates";
            description.innerHTML = "Socrates was a classical Greek (Athenian) philosopher credited as one of the founders of Western philosophy."
        }
        if (i == 2) {
            galleryLink.href = "#A2";
            galleryLink.innerHTML = "Aristotle";
            description.innerHTML = "Aristotle was a Greek philosopher and scientist born in the city of Stagira, Chalkidice, on the northern periphery of Classical Greece."
        }
        if (i == 3) {
            galleryLink.href = "#A3";
            galleryLink.innerHTML = "Plato";
            description.innerHTML = "Plato was a philosopher in Classical Greece and the founder of the Academy in Athens, the first institution of higher learning in the Western world."
        }
        if (i == 4) {
            galleryLink.href = "#A4";
            galleryLink.innerHTML = "Pythagoras";
            description.innerHTML = "Pythagoras of Samos was an Ionian Greek philosopher, mathematician, and the putative founder of the movement called Pythagoreanism."
        }
        if (i == 5) {
            galleryLink.href = "#A5";
            galleryLink.innerHTML = "Heraclitus";
            description.innerHTML = "Heraclitus of Ephesus was a pre-Socratic Greek philosopher, and a native of the city of Ephesus,then part of the Persian Empire."
        }
        if (i == 6) {
            galleryLink.href = "#A6";
            galleryLink.innerHTML = "Thales";
            description.innerHTML = "Thales of Miletus was a pre-Socratic Greek/Phonecian philosopher, mathematician and astronomer from Miletus in Asia Minor, current day Milet in Turkey and one of the Seven Sages of Greece."
        }
        if (i == 7) {
            galleryLink.href = "#A7";
            galleryLink.innerHTML = "Anaximenes";
            description.innerHTML = "Anaximenes of Miletus was an Ancient Greek Pre-Socratic philosopher active in the latter half of the 6th century BC."
        }
        if (i == 9) {
            galleryLink.href = "#A9";
            galleryLink.innerHTML = "Rene Descartes";
            description.innerHTML = "Rene Descartes was a French philosopher, mathematician, and scientist. Dubbed the father of modern western philosophy,much of subsequent Western philosophy is a response to his writings,which are studied closely to this day."
        }
        if (i == 10) {
            galleryLink.href = "#A10";
            galleryLink.innerHTML = "Niccolo Machiavelli";
            description.innerHTML = "Niccolo Machiavelli, or more formally Niccolo di Bernardo dei Machiavelli, was an Italian Renaissance historian, politician, diplomat, philosopher, humanist, and writer."
        }
    }
    function btnHandler() {
        // debugger;
        if (movebtn.innerHTML == 'Pause') {
            movebtn.innerHTML = 'Play';
            window.clearInterval(t);
            return;
        }
        if (movebtn.innerHTML == 'Play') {
            movebtn.innerHTML = 'Pause';
            t = window.setInterval(movement, 3000);
            return;
        }
    }
    var i2 = 1;
    function movement() {
        flagMove = 1;
        //debugger;


        if ((i2 % 10 + 1) == 0) {
            setImage.src = "C:/Users/saitalluri/Pictures/Images/image" + 1 + ".jpg";
            setLink(1);
        }
        else {
            console.log(i2 % 10 + 1);
            var x = i2 % 10 + 1;
            if (x == 8) {
                setImage.src = "C:/Users/saitalluri/Pictures/Images/image" + x + ".png";
                galleryLink.href = "#A8";
                galleryLink.innerHTML = "Anaximandor";
                description.innerHTML = "Anaximander was a pre-Socratic Greek philosopher who lived in Miletus,a city of Ionia (in modern-day Turkey)."
            }
            else {
                setImage.src = "C:/Users/saitalluri/Pictures/Images/image" + x + ".jpg";
                setLink(x);
            }
        }

        moveleft();
        i2++;
    }


    var t = window.setInterval(movement, 3000);


    left.addEventListener('click', moveleft);
    right.addEventListener('click', moveright);
    items.addEventListener('click', handleImage);
    movebtn.addEventListener('click', btnHandler);

    window.onmouseover = function (e) {
        //console.log(e.target.id);
        if (e.target.id >= 1 && e.target.id <= 10) {
            i = e.target.id;
            if (i == 8) {
                setImage.src = "C:/Users/saitalluri/Pictures/Images/image" + i + ".png";
                galleryLink.href = "#A8";
                galleryLink.innerHTML = "Anaximandor";
                description.innerHTML = "Anaximander was a pre-Socratic Greek philosopher who lived in Miletus,a city of Ionia (in modern-day Turkey)."
            }
            else {
                setImage.src = "C:/Users/saitalluri/Pictures/Images/image" + i + ".jpg";
                setLink(i);
            }
        }
    };



})();