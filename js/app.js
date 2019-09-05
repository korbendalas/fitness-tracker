
let days = ['mon', 'tue', 'wed', 'thu', 'fri'];

let totalSteps = 0;
//Initial state
const initialState = {
    mon: { date: [], totalDaySteps: 0 },
    tue: { date: [], totalDaySteps: 0 },
    wed: { date: [], totalDaySteps: 0 },
    thu: { date: [], totalDaySteps: 0 },
    fri: { date: [], totalDaySteps: 0 },
}
//function every_nth(arr, nth) { return arr.filter((e, i) => i % nth === nth - 1) };
function numberWithCommas(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
function fetchData() {

    fetch("https://api.myjson.com/bins/1gwnal")
        .then(res => res.json())
        .then(data => {

            data.forEach((item, i) => {
                let a = new Date(item.timestamp)
                let b = a.toString().split(" ").slice(0, 5)
                let currentDay = b[0].toLowerCase();
                totalSteps += item.steps //total steps count
                initialState[currentDay].date = b;
                initialState[currentDay].totalDaySteps += item.steps
                console.log(b)
            })
        }
        ).then(() => {

            console.log('initial state', initialState)
            // console.log('total steps', totalSteps)
            generateNav();
            createContent()

        })

}

function createElement(elType, elText, elClass) {
    let element = document.createElement(elType);
    let elementText = document.createTextNode(elText);
    if (elText) {
        element.appendChild(elementText)
    }
    if (elClass) {
        element.classList.add(elClass)
    }
    return element;
}

function generateHead() {
    let div = createElement('div')
    let h2 = createElement('h2', 'Welcome')
    let p = createElement("p", 'Overview of your activity');
    div.appendChild(h2);
    div.appendChild(p);
    document.getElementById('header').appendChild(div);
}

function generateNav() {
    days.forEach((item, i) => {
        console.log('item', item)
        let div = createElement("div", "", "nav__day");
        let day = createElement("p", initialState[item].date[2]);
        let date = createElement("p", item.toUpperCase());
        div.appendChild(day)
        div.appendChild(date)
        document.getElementById("nav").appendChild(div)
    })
}


function createContent() {
    let containerDiv = createElement("div");


    function activity() {
        //activity div container
        let activity = createElement("div", "", 'activity');

        //top div icon + headers
        let headerDiv = createElement("div", "", 'activity__top');
        let stopwatch = createElement("div", "", 'activity__top__icon');
        let icon = createElement('i', 'timer', 'material-icons');
        stopwatch.appendChild(icon);
        headerDiv.appendChild(stopwatch);


        //activity header container
        let headers = createElement('div', "", 'activity__top__headers');
        let h5 = createElement('h5', 'Activity');
        let p = createElement('p', 'Average');
        headers.appendChild(h5);
        headers.appendChild(p);
        headerDiv.appendChild(headers);

        activity.appendChild(headerDiv)

        //bottom div number values
        let dataDiv = createElement("div", "", 'activity__bottom__value');
        let data = createElement("h1", calculateActivity());
        dataDiv.appendChild(data);

        activity.appendChild(dataDiv);
        return activity;
    }

    function stepsAndCalories(iconName, iconClass, header1, header2, value) {
        let wrapper = createElement("div", "", 'wrapper');
        //top div icon + headers
        let headerDiv = createElement("div", "", 'wrapper__left');
        let icon = createElement("div", "", 'wrapper__left__icon');
        let iconElement = createElement('i', iconName, iconClass);

        icon.appendChild(iconElement);
        headerDiv.appendChild(icon);

        //activity header container
        let headers = createElement('div', "", 'wrapper__left__headers');
        let h5 = createElement('h5', header1);
        let p = createElement('p', header2);
        headers.appendChild(h5);
        headers.appendChild(p);
        headerDiv.appendChild(headers);

        //bottom div number values
        let dataDiv = createElement("div", "", 'wrapper__right');
        let data = createElement("h1", value);
        dataDiv.appendChild(data);

        wrapper.appendChild(headerDiv)
        wrapper.appendChild(dataDiv)
        return wrapper;

    }
    //add activity container

    function calculateCalories() {
        let caloriesBurned = Math.round(totalSteps * 0.05)
        return numberWithCommas(caloriesBurned);

    }

    function calculateActivity() {
        let timeSpentMinutes = (totalSteps * 0.5) / 60
        let hours = timeSpentMinutes / 60;
        let hoursFloor = Math.floor(hours);
        let minutes = Math.round((hours - hoursFloor) * 60);
        return `${hoursFloor}h ${minutes}min`;

    }


    containerDiv.appendChild(activity())

    containerDiv.appendChild(stepsAndCalories('directions_run', 'material-icons', 'Steps', 'Total', numberWithCommas(totalSteps)));
    containerDiv.appendChild(stepsAndCalories('whatshot', 'material-icons', 'Calories', 'Total burned', calculateCalories()));
    containerDiv.classList.add('content');
    document.getElementById('content').appendChild(containerDiv);
}


window.addEventListener("load", function () {

    generateHead()

    fetchData();
});
