(function () {

    function getData(afterDataCb) {

        if (window.localStorage.getItem("data")) {
            afterDataCb();
            return;
        }

        $.ajax({
            url: "https://jsonplaceholder.typicode.com/albums",
            success: FunA

        });
        $.ajax({
            url: "https://jsonplaceholder.typicode.com/photos",
            success: FunP

        });

        function FunP() {
            FunP.data = arguments[0];
            persist();
        }
        function FunA() {
            FunA.data = arguments[0];
            persist();
        }
        function persist() {
            if (FunP.data && FunA.data) {
                Photos = {};
                Photos = FunP.data;
                Albums = FunA.data;
                var mappeddata = Albums.map(function (val) {

                    val.photo = Photos.filter(function (val1) {
                        return (val1.albumId == val.id);

                    });

                });
                window.localStorage.setItem("data", JSON.stringify(mappeddata));
                afterDataCb();
            }

        }
    }

    function setHomePage() {
        getData(addAlbums);
    }

    function addAlbums() {
        //var FunA = {};
        var data = JSON.parse(window.localStorage.getItem("data"));
        var i = 0;

        for (i = 0; i < data.length; i++) {
            // console.log(i);
            $('<div class="image"><div class="editbtn"><a class="editalbumanchor"><image class="editSymbol" src="edit.png"></div></a><div class="closebtn"><image class="closeSymbol" src="close.png"></div><h4 class="albumTitle"></h4><span class="albumphotos"></span><image class="firstimage" src=""></div>').appendTo('#content');


            if (data[i].photos.length > 0) {
                var source = data[i].photos[0].url;
                // console.log(source);
                $('.firstimage').css('visibility', 'visible');
                $('.firstimage').get(i).setAttribute('src', source);
            }
            $('.albumTitle').get(i).innerHTML = data[i].title;
            $('.albumphotos').get(i).innerHTML = data[i].photos.length;
            $('.image').get(i).setAttribute("id", i);


            var tag = '#album' + $('.image').get(i).getAttribute("id");
            $('.editalbumanchor').get(i).setAttribute("href", tag);

        }

    }
    $(document).on('click', '.closeSymbol', function () {
        var data = JSON.parse(window.localStorage.getItem("data"));
        var delId = $(this).closest('[id]').attr('id');

        if (data[delId].photos.length == 0) {
            $('.image')[delId].remove();

            data.splice(delId, 1);
            window.localStorage.setItem("data", JSON.stringify(data));
        }
        else {
            alert('The photos in the album should be zero to delete album');
        }

    });

    function displayPhotos(editAId) {

        var data = JSON.parse(window.localStorage.getItem("data"));

        var length = data[editAId].photos.length;
        var i4 = 0;
        for (i4 = 0; i4 < length; i4++) {
            $('<div class="pAimage"><div class="pAeditbtn"><a href="#Aeditphoto"><image class="pAeditSymbol" src="edit.png"></a></div><div class="pAclosebtn"><image class="pAcloseSymbol" src="close.png"></div><h4 class="AphotoTitle"></h4><image class="Apicimage" src=""></div>').appendTo('#content');
            $('.AphotoTitle').css('text-align', 'center');

            $('.Apicimage').css('visibility', 'visible');

            var source2 = data[editAId].photos[i4].url;
            $('.Apicimage').get(i4).setAttribute('src', source2);
            $('.AphotoTitle').get(i4).innerHTML = data[editAId].photos[i4].title;
            $('.pAimage').get(i4).setAttribute("pid", i4);
            $('.pAimage').get(i4).setAttribute("aid", editAId);

        }

    }
    $(document).on('click', '.pAeditSymbol', function () {

        var editId = $(this).closest('[pid]').attr('pid');
        var aId = $(this).closest('[aid]').attr('aid');

        $('<div id="overlay"></div>').css({
            'position': 'fixed',
            'width': '100%',
            'height': '100%',
            'background-color': 'black',
            'opacity': '0.5',
            'z-index': '10',
            'top': '0px'
        }).appendTo('body');
        $('<div id="popUp"></div>').css({
            'position': 'fixed',
            'width': '50%',
            'height': '50%',
            'background-color': 'white',
            'border-radius': '10px',
            'box-shadow': '0px 0px 20px #fff',
            'z-index': '11',
            'top': '25%',
            'left': '25%'
        }).appendTo('body');
        $('<fieldset><legend> Add Photo</legend><form id="photoForm" ><label for="PName">Photo Title</label><input id="PName" type="text"/></br></br><label for="PURL">Url</label><input id="PURL" type="url" /></br></form></fieldset>').css({
            'position': 'absolute',
            'width': '80%',
            'height': '80%'

        }).appendTo('#popUp');
        $('label').css({
            'float': 'left',
            'width': '100px',
            'margin': '3px'
        })
        $('input').css({
            'left': '200px'
        })

        $('fieldset').css({ 'left': '7%', 'top': '7%', 'font-size': '20px' });
        $('#photoForm').css({ 'margin-top': '10%', 'margin-left': '12%' });
        $('#photoForm').append('<input id="ASubmit" type="submit"  value="Save"><input id="AReset" type="reset" value="Clear">');
        $('#ASubmit').css({ 'margin-top': '20px', 'font-size': '24px', 'margin-right': '20px', 'box-shadow': '-2px -2px 5px black' });
        $('#AReset').css({ 'margin-top': '20px', 'font-size': '24px', 'box-shadow': '-2px -2px 5px black' });
        var ASubmit = document.getElementById('ASubmit');
        var AReset = document.getElementById('AReset');
        var currentpic = $(this).closest('.pAimage');

        var PName = document.getElementById('PName');

        PName.value = currentpic.find('.AphotoTitle').html();

        var PURL = document.getElementById('PURL');

        PURL.value = (currentpic.find('.Apicimage').attr("src"));

        var Aeditpic = AaddEditPhoto.bind(this, aId, editId, currentpic);

        ASubmit.addEventListener('click', Aeditpic);

    });

    function AaddEditPhoto(aId, editId, currentpic) {
        var PName = document.getElementById('PName');
        var PURL = document.getElementById('PURL');
        var phototemp = {};
        phototemp.title = PName.value;
        phototemp.url = PURL.value;
        var source1 = phototemp.url;

        newly = newly + 1;
        currentpic.find('.Apicimage').attr("src", source1);
        currentpic.find('.AphotoTitle').html(phototemp.title);

        $('#overlay').remove();
        $('#popUp').remove();

        window.event.preventDefault();
        window.location.href = "file:///C:/Users/saitalluri/Documents/HTML%20CSS/Albums/index.html#album" + aId;


    }

    $(document).on('click', '.pAcloseSymbol', function () {
        var choice = confirm("Do you want to delete the photo?");
        if (choice) {
            $(this).closest('.pAimage').remove();

        }

    });

    $(document).on('click', '.pcloseSymbol', function () {

        var delId = $(this).closest('[pid]').attr('pid');


        tempPhotos = jQuery.grep(tempPhotos, function (value) {
            return value.pid != delId;
        });
        var choice = confirm("Do you want to delete the photo?");
        if (choice) {
            $(this).closest('[pid]').remove();

        }
    });

    $(document).on('click', '.peditSymbol', function () {
        var editId = $(this).closest('[pid]').attr('pid');

        $('<div id="overlay"></div>').css({
            'position': 'fixed',
            'width': '100%',
            'height': '100%',
            'background-color': 'black',
            'opacity': '0.5',
            'z-index': '10',
            'top': '0px'
        }).appendTo('body');
        $('<div id="popUp"></div>').css({
            'position': 'fixed',
            'width': '50%',
            'height': '50%',
            'background-color': 'white',
            'border-radius': '10px',
            'box-shadow': '0px 0px 20px #fff',
            'z-index': '11',
            'top': '25%',
            'left': '25%'
        }).appendTo('body');
        $('<fieldset><legend> Add Photo</legend><form id="photoForm" ><label for="PName">Photo Title</label><input id="PName" type="text"/></br></br><label for="PURL">Url</label><input id="PURL" type="url" /></br></form></fieldset>').css({
            'position': 'absolute',
            'width': '80%',
            'height': '80%'

        }).appendTo('#popUp');
        $('label').css({
            'float': 'left',
            'width': '100px',
            'margin': '3px'
        })
        $('input').css({
            'left': '200px'
        })

        $('fieldset').css({ 'left': '7%', 'top': '7%', 'font-size': '20px' });
        $('#photoForm').css({ 'margin-top': '10%', 'margin-left': '12%' });
        $('#photoForm').append('<input id="Submit" type="submit"  value="Save"><input id="Reset" type="reset" value="Clear">');
        $('#Submit').css({ 'margin-top': '20px', 'font-size': '24px', 'margin-right': '20px', 'box-shadow': '-2px -2px 5px black' });
        $('#Reset').css({ 'margin-top': '20px', 'font-size': '24px', 'box-shadow': '-2px -2px 5px black' });
        var Submit = document.getElementById('Submit');
        Reset = document.getElementById('Reset');
        var currentpic = $(this).closest('.pimage');

        var PName = document.getElementById('PName');

        PName.value = currentpic.find('.photoTitle').html();

        var PURL = document.getElementById('PURL');

        PURL.value = (currentpic.find('.picimage').attr("src"));

        var editpic = addEditPhoto.bind(this, editId, currentpic);

        Submit.addEventListener('click', editpic);

    });

    function addEditPhoto(editId, currentpic) {
        var PName = document.getElementById('PName');
        var PURL = document.getElementById('PURL');
        var phototemp = {};

        phototemp.title = PName.value;
        phototemp.url = PURL.value;

        var tid = tempPhotos.filter(function (val, idx) {
            return (val.pid == editId)

        }).map(function (val) {
            return val.pid;
        });

        var i3 = tid[0];

        tempPhotos[i3 - 1].title = phototemp.title;
        tempPhotos[i3 - 1].url = phototemp.url;

        var source1 = phototemp.url;

        currentpic.find('.picimage').attr("src", source1);
        currentpic.find('.photoTitle').html(phototemp.title);

        $('#overlay').remove();
        $('#popUp').remove();
        newly = newly + 1;
        console.log(newly);
        window.location.href = "file:///C:/Users/saitalluri/Documents/HTML%20CSS/Albums/index.html#create";

        Reset.click();
        window.event.preventDefault();

    }

    function change() {
        var hash = window.location.hash;
        if (hash == '#create' && newly == 0) {
            $('#add').remove();
            $('<label id="labelAlbumTitle">Album Title</label><input id="AName" type="text" placeholder="Enter Album Title"/>').css({
                'font-size': '24px',
                'margin-right': '20px',
                'left': 'calc(50% - 200px)',
                'text-align': 'center'
            }).appendTo('#header');

            $('#header').css('left', '550px');
            $('#content').empty();
            //$('.image').hide();
            $('<a href="#addphoto"><div id="padd"><image id="addSymbol" src="plus.png"></image></div></a>').css({ 'position': 'relative', 'height ': '100px', 'width': '200px', 'margin': 'auto', 'border-radius': '10px', 'cursor': 'pointer' }).appendTo('#header');
            $('#padd').css({ 'top': '50px', 'left': '200px' });
            $('<label id="labelAddPhotos">Add Photos</label>').css({ 'top': '50px', 'font-size': '24px', 'left': '60%' }).appendTo('#header');
            $('#content').css('margin-top', '300px');
            $('<button value="Submit" id="albumSave">Save</button>').css({
                'font-size': '24px'
            }).appendTo('#footer');
            $('<button id="albumsPage">Go Back</button>').css({
                'font-size': '24px',
                'position': 'absolute',
                'right': '20px'
            }).appendTo('#footer');

            $('#footer').css({
                'visibility': 'visible'
            });

            //window.onhashchange = addPhoto;
            var albumsPage = document.getElementById('albumsPage');

            var albumSave = document.getElementById('albumSave');
            albumSave.addEventListener('click', createAlbum);

            albumsPage.addEventListener('click', pagerefresh);

        }
        else {
            hash1 = hash.substring(0, 6);
            if ((hash1 == "#album" && newly == 0) || (hash1 == "#addph")) {
                if (hash1 == '#addph') {

                    var editAId = hash.substring(10);

                    addPhoto(editAId);
                }
                else {
                    var editAId = hash.substring(6);
                    alert(editAId);
                    $('#add').remove();
                    $('<label id="labelAlbumTitle">Album Title</label><input id="AName" type="text"/>').css({
                        'font-size': '24px',
                        'margin-right': '20px',
                        'left': 'calc(50% - 200px)',
                        'text-align': 'center'
                    }).appendTo('#header');

                    $('#header').css('left', '550px');
                    $('#content').empty();
                    //$('.image').hide();
                    $('<a id="sample" ><div id="padd"><image id="addSymbol" src="plus.png"></image></div></a>').css({ 'position': 'relative', 'height ': '100px', 'width': '200px', 'margin': 'auto', 'border-radius': '10px', 'cursor': 'pointer' }).appendTo('#header');
                    $('#padd').css({ 'top': '50px', 'left': '200px' });
                    $('<label id="labelAddPhotos">Add Photos</label>').css({ 'top': '50px', 'font-size': '24px', 'left': '60%' }).appendTo('#header');
                    $('#content').css('margin-top', '300px');
                    $('<button value="Submit" id="EditalbumSave">Save</button>').css({
                        'font-size': '24px',
                        'position': 'absolute',
                        'left': '80px',
                        'z-index': '3'
                    }).appendTo('#footer');
                    $('<button id="EditalbumsPage">Go Back</button>').css({
                        'font-size': '24px',
                        'position': 'absolute',
                        'right': '80px',
                        'z-index': '3'
                    }).appendTo('#footer');
                    $('#sample').attr('href', "#addphotoA" + editAId);
                    $('#footer').css({
                        'visibility': 'visible'
                    });
                    var EditalbumsPage = document.getElementById('EditalbumsPage');

                    var AName = document.getElementById('AName');
                    var data = JSON.parse(window.localStorage.getItem("data"));
                    AName.value = data[editAId].title;

                    displayPhotos(editAId);
                    EditalbumsPage.addEventListener('click', pagerefresh);
                }
            }
        }

    }


    function pagerefresh() {
        window.location.href = "file:///C:/Users/saitalluri/Documents/HTML%20CSS/Albums/index.html";
    }

    function createAlbum() {

        var data = JSON.parse(window.localStorage.getItem("data"));
        var AName = document.getElementById('AName');

        var nameAlbum = AName.value;

        var x = 0;
        var exist = data.filter(function (val) {

            return (val.title == nameAlbum);
        }).map(function (val) {
            x++;
            console.log(x);

            return x;
        });
        exist = exist.length;
        if (exist >= 1) {

            alert("Album name already exists");
        }
        else {
            data.push({ title: nameAlbum, id: data.length + 1, photos: tempPhotos });
        }

        window.localStorage.setItem("data", JSON.stringify(data));

        addAlbums();

        $(' <a id="#addcreate" href="#create"><div id="add"><image id="addSymbol" src="plus.png"></image></div></a> ').appendTo('#header');
        $('#padd').hide();
        $('#labelAddPhotos').css('display', 'none');
        $('#AName').css('display', 'none');
        $('#albumSave').hide();
        $('#albumsPage').hide();
        $('#labelAlbumTitle').css('display', 'none');
        $('#content').css('margin-top', '110px');

        window.location.href = "file:///C:/Users/saitalluri/Documents/HTML%20CSS/Albums/index.html";


        var tag = '#album' + $('.image').get(data.length - 1).getAttribute("id");
        $('.editalbumanchor').get(data.length - 1).setAttribute("href", tag);

    }

    function addPhoto(editAId) {
        var hash = location.hash;
        $('<div id="overlay"></div>').css({
            'position': 'fixed',
            'width': '100%',
            'height': '100%',
            'background-color': 'black',
            'opacity': '0.5',
            'z-index': '10',
            'top': '0px'
        }).appendTo('body');
        $('<div id="popUp"></div>').css({
            'position': 'fixed',
            'width': '50%',
            'height': '50%',
            'background-color': 'white',
            'border-radius': '10px',
            'box-shadow': '0px 0px 20px #fff',
            'z-index': '11',
            'top': '25%',
            'left': '25%'
        }).appendTo('body');
        $('<fieldset><legend> Add Photo</legend><form id="photoForm" ><label for="PName">Photo Title</label><input id="PName" type="text" placeholder="Enter Photo Title"/></br></br><label for="PURL">Url</label><input id="PURL" type="url" placeholder="Enter Image URL"/></br></form></fieldset>').css({
            'position': 'absolute',
            'width': '80%',
            'height': '80%'

        }).appendTo('#popUp');
        $('label').css({
            'float': 'left',
            'width': '100px',
            'margin': '3px'
        })
        $('input').css({
            'left': '200px'
        })
        $('fieldset').css({ 'left': '7%', 'top': '7%', 'font-size': '20px' });
        $('#photoForm').css({ 'margin-top': '10%', 'margin-left': '12%' });
        $('#photoForm').append('<input id="Submit" type="submit"  value="Save"><input id="Reset" type="reset" value="Clear">');
        $('#Submit').css({ 'margin-top': '20px', 'font-size': '24px', 'margin-right': '20px', 'box-shadow': '-2px -2px 5px black' });
        $('#Reset').css({ 'margin-top': '20px', 'font-size': '24px', 'box-shadow': '-2px -2px 5px black' });
        //debugger;      
        if (hash == '#addphoto') {
            newly = newly + 1;
            var Submit = document.getElementById('Submit');
            Reset = document.getElementById('Reset');
            Submit.addEventListener('click', addCurrentPhoto);
        }
        else if (hash.substring(0, 10) == "#addphotoA") {

            var Submit = document.getElementById('Submit');
            Reset = document.getElementById('Reset');

            var Aaddpic = addCurrentPhotoA.bind(this, editAId);
            Submit.addEventListener('click', Aaddpic);
            newly = newly + 1;
        }
    }

    function addCurrentPhotoA(editAId) {

        var PName = document.getElementById('PName');
        var PURL = document.getElementById('PURL');
        var phototemp = {};
        phototemp.title = PName.value;
        phototemp.url = PURL.value;
        var data = JSON.parse(window.localStorage.getItem("data"));
        var tempPhotos1 = $('.AphotoTitle');
        var exist = 0;
        var i2 = 0;
        for (i2 = 0; i2 < tempPhotos1.length; i2++) {
            if (tempPhotos1.get(i2).innerHTML == phototemp.title) {

                exist++;
            }
        }

        if (exist > 0) {
            alert('Photos with same name can not exists in same Album');

        }
        else {
            //tempPhotos1.push(phototemp);
            alert(phototemp.title + " " + phototemp.url);
            $('#overlay').remove();
            $('#popUp').remove();
            window.event.preventDefault();
            history.back();
            $('<div class="pAimage"><div class="pAeditbtn"><a href="#Aeditphoto"><image class="pAeditSymbol" src="edit.png"></a></div><div class="pAclosebtn"><image class="pAcloseSymbol" src="close.png"></div><h4 class="AphotoTitle"></h4><image class="Apicimage" src=""></div>').appendTo('#content');
            $('.AphotoTitle').css('text-align', 'center');
            $('.Apicimage').css('visibility', 'visible');
            var source2 = phototemp.url;
            $('.Apicimage').get($('.Apicimage').length - 1).setAttribute('src', source2);
            $('.AphotoTitle').get($('.Apicimage').length - 1).innerHTML = phototemp.title;

        }

        Reset.click();
        window.event.preventDefault();

    }

    function addCurrentPhoto() {
        var PName = document.getElementById('PName');
        var PURL = document.getElementById('PURL');
        var phototemp = {};

        phototemp.title = PName.value;
        phototemp.url = PURL.value;

        addPhotosToTempList(phototemp);

        Reset.click();
        window.event.preventDefault();
    }

    var tempPhotos = [];

    function addPhotosToTempList(phototemp) {

        if (tempPhotos.length > 0) {
            phototemp.pid = tempPhotos[tempPhotos.length - 1].pid + 1;
        }
        else {
            phototemp.pid = 1;
        }
        var exist = 0;
        var i2 = 0;
        for (i2 = 0; i2 < tempPhotos.length; i2++) {
            if (tempPhotos[i2].title == phototemp.title) {

                exist++;
            }
        }
        if (exist > 0) {
            alert('Photos with same name can not exists in same Album');

        }
        else {

            tempPhotos.push(phototemp);
            alert(phototemp.title + " " + phototemp.url);
            $('#overlay').remove();
            $('#popUp').remove();
            history.back();
            showdivphotos(phototemp);
        }
    }

    function showdivphotos(phototemp) {
        //debugger;
        $('<div class="pimage"><div class="peditbtn"><a href="#editphoto"><image class="peditSymbol" src="edit.png"></a></div><div class="pclosebtn"><image class="pcloseSymbol" src="close.png"></div><h4 class="photoTitle"></h4><image class="picimage" src=""></div>').appendTo('#content');
        $('.photoTitle').css('text-align', 'center');

        var source = phototemp.url;
        // console.log(source);
        $('.picimage').css('visibility', 'visible');
        $('.picimage').get(tempPhotos.length - 1).setAttribute('src', source);

        $('.photoTitle').get(tempPhotos.length - 1).innerHTML = phototemp.title;
        $('.pimage').get(tempPhotos.length - 1).setAttribute("pid", phototemp.pid);
    }
    function init() {
        newly = 0;
        setHomePage();
        window.addEventListener('hashchange', change);
        //change();
    }
    init();


})();