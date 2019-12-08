/*****************************
\ define template types
/*****************************/

basicItems = [
  	["Titel", "text", "id=\"pgTitle\" name=\"pgTitle\" class=\"form-control darkLoad\" placeholder=\"I'm an example title.\""],
	["Cover", "text", "id=\"pgCover\" name=\"pgCover\" class=\"form-control darkLoad\" placeholder=\"I'm an example cover link.\""],
  	["Description", "textarea", "rows=\"5\" cols=\"10\" id=\"pgDescription\" name=\"pgDescription\" class=\"form-control darkLoad\" placeholder=\"I'm an example description.\""],
	["Information", "textarea", "rows=\"5\" cols=\"10\" id=\"pgInformation\" name=\"pgInformation\" class=\"form-control darkLoad\" placeholder=\"I'm an example information.\""],
];

basic = `[CENTER][COLOR=#ff0000][FONT=book antiqua][SIZE=5]%pgCleanTitle%

[IMG]%pgCover%[/IMG]
[/SIZE][/FONT][/COLOR]

[IMG]%pgCover%[/IMG]

[SIZE=2][FONT=arial]%pgDescription%

[CODE][/FONT][/SIZE][SIZE=2][FONT=arial]%pgInformation%[/CODE]

[HIDE] ATTACH
[COLOR=#ff0000][SIZE=3]Passwort: n/A
[/SIZE][/COLOR][/HIDE]


[/FONT][/SIZE]
[/CENTER]
`;

musicItems = [
  ["Titel", "text", "id=\"pgTitle\" name=\"pgTitle\" class=\"form-control darkLoad\" placeholder=\"I'm an example audio title.\""],
  ["Cover", "text", "id=\"pgCover\" name=\"pgCover\" class=\"form-control darkLoad\" placeholder=\"I'm an example cover link.\""],
  ["Tracklist", "textarea", "rows=\"5\" cols=\"10\" id=\"pgTracklist\" name=\"pgTracklist\" class=\"form-control darkLoad\" placeholder=\"I'm an example audio tracklist.\""],
];

music = `[CENTER][COLOR=#ff0000][FONT=book antiqua][SIZE=5]%pgCleanTitle%

[IMG]%pgCover%[/IMG]
[/SIZE][/FONT][/COLOR]

[IMG]%pgCover%[/IMG]

[SIZE=2][FONT=arial]

[CODE][/FONT][/SIZE][SIZE=2][FONT=arial]%pgTracklist%[/CODE]

[HIDE] ATTACH
[COLOR=#ff0000][SIZE=3]Passwort: n/A
[/SIZE][/COLOR][/HIDE]


[/FONT][/SIZE]
[/CENTER]
`;


/*****************************
\ do some magic
/*****************************/

function prepare(template) {

	document.getElementById("flexContent").innerHTML = "<br /><br />";

	templateArray = eval( template.toString() +"Items" );

    for(var i = 0; i < templateArray.length; i++) {

    	if(templateArray[i][1] == "text") {
    		document.getElementById("flexContent").innerHTML += "<label>" + templateArray[i][0] + "</label><input type=\"text\" " + templateArray[i][2] + " /><br />";
    	}

    	if(templateArray[i][1] == "textarea") {
    		document.getElementById("flexContent").innerHTML += "<label>" + templateArray[i][0] + "</label><textarea " + templateArray[i][2] + " ></textarea><br />";
    	}

    }
}

function reset() {
    location.reload(true);
}

function resetForm() {

    var pg = {};
    var inputs = document.forms['pg'];
    for (var i = 0; i < inputs.length; i++) {

        if (inputs[i].name.match(/^pg(.*)$/)) {

            if (!inputs['Keep' +  inputs[i].name.match(/^pg(.*)$/)[1]].checked) {
                if (!(inputs[i].type == 'radio')) {
                    document.getElementById(inputs[i].name).value = "";
                }
                else {
                    document.getElementsByName(inputs[i].name)[0].checked = "checked";
                }
            }
        }
    }
    document.getElementById("pgPostingCode").value = "";
}


function copyToClipboard(element) {
    var text = document.getElementById("pgPostingCode");
    text.removeAttribute("disabled");
    text.focus();
    text.select();
    document.execCommand('copy');
}

function createTemplate() {

	var sel = document.getElementById('selector');

	document.getElementById("pg").style.display = "none";
	document.getElementById("postTemplate").style.display = "initial";

    var pg = {};
    var inputs = document.forms['pg'];
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].name.match(/^pg/)) {
            if (!(inputs[i].type == 'radio' && inputs[i].checked == false)) {
                pg[inputs[i].name] = inputs[i].value;
            }
        }
    }
    pg['pgCleanTitle'] = pg['pgTitle'].replace(/\./g, " ");
    pg['pgPostingCode'] = eval(sel.value);

    for (var key in pg) {
        pattern = new RegExp("%" + key + "%", "gi");
        pg['pgPostingCode'] = pg['pgPostingCode'].replace(pattern, pg[key]);
    }

    document.getElementById('pgPostingCode').value = pg['pgPostingCode'];
}

prepare('basic');
