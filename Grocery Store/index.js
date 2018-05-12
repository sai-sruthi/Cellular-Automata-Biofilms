(function () {
    "use strict";
    debugger;
    var GroceryItemName = document.getElementById('GroceryItemName');
    var GroceryItemDesc = document.getElementById('GroceryItemDesc');
    var GroceryItemPrice = document.getElementById('GroceryItemPrice');
    var btnSubmit = document.getElementById('btnSubmit');
    var btnClear = document.getElementById('btnClear');
    var listGrocery = document.getElementById('listItems');
    var legendName = document.querySelector('#legendId');
    var groceries = [];
    var currentLi = null;//Flag to see is update or new

    function handleSubmitClick() {

        var grocery = {};

        grocery.name = GroceryItemName.value;
        grocery.desc = GroceryItemDesc.value;
        grocery.price = GroceryItemPrice.value;


        if (isValid(grocery)) {
            if (currentLi == null) {
                addGrocery(grocery);
            }
            else {
                updatingGrocery(grocery);
            }
        }
        btnClear.click();
        window.event.preventDefault();
    }

    function addGrocery(grocery) {

        //Adding a grocery id

        if (groceries.length > 0) {
            grocery.groceryid = groceries[groceries.length - 1].groceryid + 1;
        }
        else {
            grocery.groceryid = 1;
        }

        var itemgot = liGenerator(grocery);

        listGrocery.appendChild(itemgot);

        groceries.push(grocery);
        persist();

    }

    function updatingGrocery(grocery) {


        currentLi.style.backgroundColor = "rgba(63, 81, 181, 0.63)";

        //get id
        grocery.groceryid = currentLi.getAttribute('data-value');

        //Use id to get name
        var updateName = document.querySelector("li[data-value='" + grocery.groceryid + "'] [purpose='grocName']");
        var updateDesc = document.querySelector("li[data-value='" + grocery.groceryid + "'] [purpose='grocDesc']");
        var updatePrice = document.querySelector("li[data-value='" + grocery.groceryid + "'] [purpose='grocPrice']");

        legendName.innerHTML = "Add Grocery";

        //Updating the element required
        updateName.innerHTML = grocery.name;
        updateDesc.innerHTML = grocery.desc;
        updatePrice.innerHTML = grocery.price;

        /////////////////////
        //Added
        updateName.setAttribute("data-value", grocery.name);

        var i = 0;
        //Finding the item in list

        for (i = 0; i < groceries.length; i++) {
            if (groceries[i].groceryid == grocery.groceryid) {
                break;
            }
        }

        groceries[i] = grocery;

        persist();

        legendName.innerHTML = "Grocery Store";
        currentLi = null;


    }

    function liGenerator(grocery) {
        var src = litemplate.innerHTML;

        src = src.replaceAll("{{groceryName}}", grocery.name);
        src = src.replaceAll("{{groceryDesc}}", grocery.desc);
        src = src.replaceAll("{{groceryPrice}}", grocery.price);

        var li = document.createElement('li');

        li.setAttribute('data-value', grocery.groceryid);

        li.innerHTML = src;
        return li;


    }

    //Function to handle Cancel and Update on Li
    function handleListClick() {


        var clickElement = window.event.srcElement;

        if (clickElement.getAttribute('action') === 'delete') {
            var spanDelete = clickElement;
            var spanTitle = spanDelete.nextElementSibling;//To get the name of the element

            var choice = confirm('Do you want to delete ' + spanTitle.innerHTML + ' ?');
            if (choice) {
                //get id
                var groceryid = spanDelete.parentNode.getAttribute('data-value');

                var i = 0;
                //Getting the element to delete same as in update
                for (i = 0; i < groceries.length; i++) {
                    if (groceries[i].groceryid == groceryid) {
                        break;
                    }
                }

                groceries.splice(i, 1);

                window.event.srcElement.parentNode.remove();

                persist();

                ////////////
                //////Added condition
                if (currentLi != null) {
                    if (currentLi.getAttribute('data-value') == groceryid) {
                        currentLi = null;
                        btnClear.click();
                    }
                }


            }

        }
        else {
            if (clickElement.constructor == HTMLLIElement) {
                currentLi = clickElement;
            }
            else {
                currentLi = clickElement.parentNode;
            }

            var LiListAll = document.querySelectorAll('li');
            var i = 0;
            for (i = 0; i < LiListAll.length; i++) {
                LiListAll[i].style.backgroundColor = "rgba(63, 81, 181, 0.63)";

            }
            currentLi.style.backgroundColor = "beige";

            groceryid = currentLi.getAttribute('data-value');

            var updateName = document.querySelector("li[data-value='" + groceryid + "'] [purpose='grocName']");
            var updateDesc = document.querySelector("li[data-value='" + groceryid + "'] [purpose='grocDesc']");
            var updatePrice = document.querySelector("li[data-value='" + groceryid + "'] [purpose='grocPrice']");

            legendName.innerHTML = "Update Grocery";
            GroceryItemName.value = updateName.innerHTML;
            GroceryItemDesc.value = updateDesc.innerHTML;
            GroceryItemPrice.value = updatePrice.innerHTML;


        }


    }

    function isValid(grocery) {
        if (!grocery.name) {
            showMessage("Grocery Name can't be empty!");
            return false;
        }

        //to check for duplicates
        var existing = document.querySelectorAll('h2[purpose="grocName"][data-value="' +
			grocery.name + '"]');

        if (existing.length > 0 &&
            (currentLi == null || existing[0].parentNode !== currentLi)) {
            showMessage("Grocery name already exists!");
            return false;
        }

        //price
        var price = parseInt(grocery.price, 10);

        //////////Added
        //Price Empty
        if (!price) {
            showMessage("Price is required");
            return false;
        }
        //Price Negative
        if (price <= 0) {
            showMessage("Price can't be negative");
            return false;
        }


        return true;
    }

    function showMessage(message) {
        alert(message);
    }

    function persist() {
        window.localStorage.setItem("groceries", JSON.stringify(groceries));
    }

    function setPageUp() {
        var groceryData = window.localStorage.getItem("groceries");
        if (groceryData) {
            groceries = JSON.parse(groceryData);
        }//Parse the data 

        //Adding if already exists
        var i;
        for (i = 0; i < groceries.length; i++) {
            var itemgot = liGenerator(groceries[i]);
            listGrocery.appendChild(itemgot);
        }
    }

    function init() {
        btnSubmit.addEventListener('click', handleSubmitClick);
        listGrocery.addEventListener('click', handleListClick);
        setPageUp();//to retrieve any old items...
    }
    init();

})();