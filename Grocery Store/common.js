(function (){
    function replaceAll(old, changeto) {
        var input = this;
        while (input.indexOf(old) != -1) {
            input = input.replace(old, changeto);
        }
        return input;
    }
    //Toi
        if (typeof String.prototype.replaceAll === 'undefined') {
            String.prototype.replaceAll = replaceAll;
        }

})();