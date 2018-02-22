(function() {

    let unButtondeMod = document.querySelectorAll('.modifier');


    for (elm of unButtondeMod) {
        elm.addEventListener('click', function(){
            
            let lesInfosClients = [];
            let tr = this.parentNode.parentNode;
            
            //for ();
            lesInfosClients[0] = tr.children[0].innerHTML;
            lesInfosClients[1] = tr.children[1].innerHTML;
            lesInfosClients[2] = tr.children[2].innerHTML;
            lesInfosClients[3] = tr.children[3].innerHTML;
            lesInfosClients[4] = tr.children[4].innerHTML;

            let elmForm = document.getElementById('mod');

           let elmInput =document.getElementById('mod').querySelectorAll("input[type=hidden]");
            elmInput[0].value = lesInfosClients[0];
            elmInput[1].value = lesInfosClients[1];
            elmInput[2].value = lesInfosClients[2];
            elmInput[3].value = lesInfosClients[3];
            elmInput[4].value = lesInfosClients[4];

            elmForm.submit()
            

        })
    }

})();