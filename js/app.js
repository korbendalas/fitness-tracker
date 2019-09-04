// fetch("https://api.myjson.com/bins/1gwnal")
//     .then(res => res.json())
//     .then(data => {
//         data.forEach((item, i) => {
//             let a = new Date(item.timestamp)
//             let b = a.toString().split(" ").slice(0, 5)
//             console.log(b)
//         })
//     })

function generateHead() {
    let div = document.createElement("div");

    let h2 = document.createElement("h2");
    let h2Text = document.createTextNode('Welcome');
    h2.appendChild(h2Text);

    let p = document.createElement("p");
    let pText = document.createTextNode('Overview of your activity');
    p.appendChild(pText)

    div.appendChild(h2);
    div.appendChild(p);
    document.getElementById('header').appendChild(div)
}


function generateNav() {
    for (i = 0; i < 5; i++) {
        let div = document.createElement("div");
        let day = document.createElement("p");
        let date = document.createElement("p");

        let dayText = document.createTextNode(i);
        let dateText = document.createTextNode('MON');
        day.appendChild(dayText);
        date.appendChild(dateText);
        div.appendChild(day)
        div.appendChild(date)
        div.classList.add("nav__day");
        document.getElementById("nav").appendChild(div)
    }
}

function createContent() {
    let containerDiv = document.createElement("div");

    function activity() {
        //activity div container
        let activity = document.createElement("div");
        activity.classList.add('activity');
        //top div icon + headers
        let headerDiv = document.createElement("div");
        headerDiv.classList.add('activity__top');
        let stopwatch = document.createElement("div");

        stopwatch.classList.add('activity__top__icon');
        let icon = document.createElement('i');
        let stopwatchIcon = document.createTextNode('timer');
        icon.appendChild(stopwatchIcon);
        icon.classList.add('material-icons')
        stopwatch.appendChild(icon);
        headerDiv.appendChild(stopwatch);



        //activity header container
        let headers = document.createElement('div');
        let h5 = document.createElement('h5');
        let h5Text = document.createTextNode('Activity');
        h5.appendChild(h5Text);
        let p = document.createElement('p');
        let pText = document.createTextNode('Average');
        p.appendChild(pText);
        headers.appendChild(h5);
        headers.appendChild(p);
        headers.classList.add('activity__top__headers');
        headerDiv.appendChild(headers);

        activity.appendChild(headerDiv)

        //bottom div number values
        let dataDiv = document.createElement("div");
        let data = document.createElement("h1");
        let dataValue = document.createTextNode('8h 22min');
        data.appendChild(dataValue);
        dataDiv.appendChild(data);
        dataDiv.classList.add('activity__bottom__value');
        activity.appendChild(dataDiv);

        return activity;
    }
    // function steps() {
    //     let steps = document.createElement('div');
    //     steps.classList.add('steps');
    //     let runing = document.createElement("div");
    //     let icon = document.createElement('i');
    //     let runingIcon = document.createTextNode('STOPwwwww');
    //     icon.appendChild(runingIcon);


    // }


    //add activity container
    containerDiv.appendChild(activity())
    containerDiv.classList.add('content');
    document.getElementById('content').appendChild(containerDiv);
}


window.addEventListener("load", function () {
    generateNav();
    generateHead()
    createContent();
});




// 
// let text = document.createTextNode('Overviev your activity')
// p = document.innerHTML(text)

// document.getElementById('header').appendChild(p);