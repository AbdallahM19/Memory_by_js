let Section = document.getElementsByTagName('section')[0];
let memoryText = Section.getElementsByTagName('textarea')[0];
let buttonMode = document.getElementById('dark_light_mode');
let all_memory = document.getElementById('all_memory');

function newchildDiv(memorytextline, memorytime, id) {
    let memoryDiv = document.createElement('div');
    let memoryDivtimeandbutton = document.createElement('div');
    let timeMemory = document.createElement('h3');
    let memoryText = document.createElement('h4');
    let buttonDeletememory = document.createElement('button');

    memoryDiv.className = 'memory-item';
    memoryDiv.style.cssText = '\
        display: flex;\
        flex-direction: column;\
        align-items: center;\
        justify-content: center;\
        height: auto;\
        width: 85%;\
        margin: auto;\
        margin-top: 8px;\
        padding: 20px;\
        background-color: rgb(122, 122, 122);\
        border-radius: 7px;\
    ';

    memoryDivtimeandbutton.setAttribute('id', 'timeandbutton');
    memoryDivtimeandbutton.className = 'timeandbutton';

    timeMemory.innerHTML = `${memorytime}`;
    timeMemory.style.cssText = '\
        float: left;\
        font-size: 13px;\
        font-weight: bold;\
        color: rgb(0, 0, 0);\
        margin: auto;\
        padding: auto;\
    ';

    memoryText.innerHTML = `${memorytextline}`;
    memoryText.style.cssText = '\
        display: flex;\
        justify-content: center;\
        align-content: center;\
        align-items: center;\
        height: auto;\
        width: 95%;\
        margin: auto;\
        padding: 10px;\
        font-size: 18px;\
        color: rgb(0, 0, 0);\
        background-color: rgb(230, 230, 230);\
        border-radius: 5px;\
        border-top: 2px solid rgb(0, 0, 0);\
        border-bottom: 2px solid rgb(0, 0, 0);\
    ';

    buttonDeletememory.textContent = 'Delete';
    buttonDeletememory.setAttribute('id', 'buttonDelete');
    buttonDeletememory.setAttribute('class', 'buttonDelete');
    buttonDeletememory.setAttribute('iddel', `${id}`);

    memoryDivtimeandbutton.appendChild(timeMemory);
    memoryDivtimeandbutton.appendChild(buttonDeletememory);
    memoryDiv.appendChild(memoryDivtimeandbutton);
    memoryDiv.appendChild(memoryText);
    memoryDiv.setAttribute('id', `${id}`)
    all_memory.appendChild(memoryDiv);
}
// console.log(buttonMode);
// console.log(buttonMode.querySelector('img'));

memoryText.addEventListener('input', function() {
    addAttributedir();
});

function addAttributedir() {
    const firstChar = memoryText.value.charAt(0);
    if (/[\u0600-\u06FF]/.test(firstChar)) { // Arabic characters range
        memoryText.setAttribute('dir', 'rtl');
    } else {
        memoryText.setAttribute('dir', 'ltr');
    }
}

document.getElementById('submitSave').addEventListener("click", function (event) {
    let Section = document.querySelector('section');
    let memoryTextValue = memoryText.value;
    let elementSuccess = document.createElement('h4');
    // let elementSuccessh5 = document.createElement('h5');

    if (memoryTextValue === "") {
        event.preventDefault(); // Prevent default action (if any)
        console.log('Memory text is empty');
        elementSuccess.innerHTML = "Please enter some text.";
        elementSuccess.style.color = "red";
        elementSuccess.style.border = "2px solid red";
        elementSuccess.style.borderRadius = "5px";
        elementSuccess.style.padding = "10px 15px";
        elementSuccess.style.margin = "10px auto 15px auto";
        
        if (Section.querySelector('h4')) {
            Section.querySelector('h4').remove();
        }
        Section.querySelector('button').after(elementSuccess);

        return; // Exit the function early
    }

    fetch('http://127.0.0.1:5000/savememories', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            'memory': memoryTextValue
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        console.log(data.data);

        newchildDiv(data.data['memory'], data.data['time'], data.data['id'])

        elementSuccess.innerHTML = "Saved Successfully :)";
        // elementSuccessh5.innerHTML = "Page will Reload ..";
    
        // elementSuccessh5.style.color =
        elementSuccess.style.color = "green";
        elementSuccess.style.border = "2px solid green";
        elementSuccess.style.borderRadius = "5px";
        elementSuccess.style.padding = "10px 15px";
        elementSuccess.style.margin = "10px auto 15px auto";
        // elementSuccessh5.style.margin = "5px auto";
        // elementSuccessh5.style.marginBottom = "15px";
    
        if (Section.querySelector('h4')) {
            Section.querySelector('h4').remove();
        }
        Section.querySelector('button').after(elementSuccess);
        memoryText.value = "";
        // if (elementSuccess) {
        //     elementSuccess.after(elementSuccessh5);
        // }
    })
    .catch(err => {
        console.error(`Error ${err}`);
    });

    // setTimeout(function () {
    //     location.reload();
    // }, 5000);
});

buttonMode.addEventListener("click", function (event) {
    if (buttonMode.getAttribute("modeColor") === 'light') {
        document.body.style.cssText = '\
            background-color: rgb(0, 0, 0);\
            color: rgb(255, 255, 255);\
        ';
        buttonMode.setAttribute("modeColor", "dark");
        buttonMode.querySelector('img').setAttribute("src", "../static/images/sleep-mode.png");
        buttonMode.style.backgroundColor = "rgb(230, 230, 230)";
    } else if (buttonMode.getAttribute("modeColor") === 'dark') {
        document.body.style.cssText = '\
            background-color: rgb(200, 200, 200);\
            color: rgb(0, 0, 0);\
        ';
        buttonMode.setAttribute("modeColor", "light");
        buttonMode.querySelector('img').setAttribute("src", "../static/images/brightness.png");
        buttonMode.style.backgroundColor = "rgb(20, 20, 20)";
        // buttonMode.style.margin = "auto";
    }
});

all_memory.addEventListener('click', function (event) {
    if (event.target && event.target.id === 'buttonDelete') {
        let idToDelete = event.target.getAttribute('iddel');
        // console.log(idToDelete);
        deleteMemory(idToDelete);
    }
});

function deleteMemory(id) {
    fetch(`http://127.0.0.1:5000/deletememory/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error(`Failed in Response Status = ${response.status}`); // Throw an error if the status is not 200
        }
    })
    .then(data => {
        if (data.message === 'Memory deleted successfully' && data.success === true) {
            console.log(`id memory => ${id}`);
            document.getElementById(id).remove();
        }
    })
    .catch(error => {
        console.error('Error:', error);
    })
}

function reloadpagewithdata() {
    fetch('http://127.0.0.1:5000/loadmemories', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            newchildDiv(element['memory'], element['time'], element['id']);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
reloadpagewithdata();