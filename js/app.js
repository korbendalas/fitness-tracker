
let days = ['mon', 'tue', 'wed', 'thu', 'fri'];

let totalSteps = 0;
let loading = true;
//Initial state
const initialState = {
    mon: { date: [], totalDaySteps: 0 },
    tue: { date: [], totalDaySteps: 0 },
    wed: { date: [], totalDaySteps: 0 },
    thu: { date: [], totalDaySteps: 0 },
    fri: { date: [], totalDaySteps: 0 },
}

function loader() {
    let div = createElement('div', '', 'loader')
    return div;
}


function numberWithCommas(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

function calculateCalories(steps) {
    let caloriesBurned = Math.round(steps * 0.05)
    return numberWithCommas(caloriesBurned);

}

function calculateDistance(steps) {
    let distance = (steps * 0.762) * 0.001
    return distance.toFixed(1)
}
function calculateAverageKm() {
    return calculateDistance(totalSteps) / 5
}

function calculateActivity(steps, screen2) {
    let timeSpentMinutes = (steps * 0.5) / 60
    let hours = timeSpentMinutes / 60;
    let hoursFloor = Math.floor(hours);

    let minutes = Math.round((hours - hoursFloor) * 60);
    return screen2 ? hours.toFixed(1) : `${hoursFloor}h ${minutes}min`

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

            })
        }
        ).then(() => {

            generateNav();
            generateHead();
            // loading = false;
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

function activeClass(e) {

    if (document.querySelector('nav__day.active') !== null) {
        document.querySelector('nav__day.active').classList.remove('active');
    }

}


function generateHead(screen2) {
    function formatDay(day) {
        switch (day) {
            case 'Mon':
                return 'Monday';
                break;
            case 'Tue':
                return 'Tuesday';
                break;
            case 'Wed':
                return 'Wednesday';
                break;
            case 'Thu':
                return 'Thursday';
                break;
            case 'Fri':
                return 'Friday';
                break;
            default:
                return 'Weekend'
        }
    }

    function formatMonth(month) {
        switch (month) {
            case 'Jan':
                return 'January ';
                break;
            case 'Feb':
                return 'February';
                break;
            case 'Mar':
                return 'March';
                break;
            case 'Apr':
                return 'April';
                break;
            case 'May':
                return 'May';
                break;
            case 'Jun':
                return 'June';
                break;
            case 'Jul':
                return 'July';
                break;
            case 'Aug':
                return 'August';
                break;
            case 'Sep':
                return 'Sep';
                break;
            case 'Oct':
                return 'October';
                break;
            case 'Nov':
                return 'November';
                break;
            case 'Dec':
                return 'December';
                break;
            default:
                return 'Month'
        }
    }

    if (screen2) { //scren 2
        let header = document.getElementById('header');
        header.innerHTML = "";

        let div = createElement('div', '', 'screen2Header'); //wrapper
        //icon wrapper div 
        let icon = createElement("div", '', 'screen2Header__arrow');
        let iconElement = createElement('i', 'chevron_left', 'material-icons');
        icon.appendChild(iconElement);
        icon.addEventListener('click', () => {
            createContent();
            generateHead()

            //to remove class active!
            let elems = document.querySelectorAll(".active");
            [].forEach.call(elems, function (el) {
                el.classList.remove("active");
            });
        })

        // div for h2 and p 
        let h2P = createElement('div', '', 'screen2Header__headers')
        let h2 = createElement('h2', formatDay(screen2.date[0]))
        let p = createElement("p", `${formatMonth(screen2.date[1])} ${screen2.date[2]}. ${screen2.date[3]}`);
        h2P.appendChild(h2);
        h2P.appendChild(p);

        div.appendChild(icon);
        div.appendChild(h2P);

        header.appendChild(div);
        // header.style.justifyContent = 'center'
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.25)'

    } else {//first screen
        document.getElementById('header').innerHTML = "";
        let div = createElement('div')
        let h2 = createElement('h2', 'Welcome')
        let p = createElement("p", 'Overview of your activity');
        div.appendChild(h2);
        div.appendChild(p);
        document.getElementById('header').appendChild(div);
        header.appendChild(div);
        // header.style.justifyContent = 'center'
        header.style.backgroundColor = '#FFFFFF'
    }
    //if screen2 than generate for screen2

}

function generateNav() {


    days.forEach((item, i) => {
        let div = createElement("div", "", "nav__day");
        let day = createElement("p", initialState[item].date[2]);
        let date = createElement("p", item.toUpperCase());
        div.appendChild(day)
        div.appendChild(date)
        div.addEventListener('click', function (e) {

            let elems = document.querySelectorAll(".active");
            [].forEach.call(elems, function (el) {
                el.classList.remove("active");
            });
            div.classList.add('active')

            document.getElementById('content').innerHTML = "";
            generateScreen2(initialState[item]);
            generateHead(initialState[item]);

        })


        document.getElementById("nav").appendChild(div)
    })
}
//intro screen
function createContent() {

    document.getElementById('content').innerHTML = "";
    let containerDiv = createElement("div", "", "content");
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
        let data = createElement("h1", calculateActivity(totalSteps));
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

    containerDiv.appendChild(activity())
    containerDiv.appendChild(stepsAndCalories('directions_run', 'material-icons', 'Steps', 'Total', numberWithCommas(totalSteps)));
    containerDiv.appendChild(stepsAndCalories('whatshot', 'material-icons', 'Calories', 'Total burned', calculateCalories(totalSteps)));
    containerDiv.appendChild(stepsAndCalories('transfer_within_a_station', 'material-icons', 'Average', 'Distance in km', calculateAverageKm()));
    document.getElementById('content').appendChild(containerDiv);


}
function generateScreen2(screen2Data) {
    let wrapperDiv = createElement('div', '', 'screenTwoWrapper');

    function circle() {
        let circle = createElement("div", "", 'circle');
        let innerCircle = createElement("div", "", 'circle__inner');
        let icon = createElement("div", '', 'circle__inner__icon');
        let iconElement = createElement('i', 'directions_run', 'material-icons');
        let stepsText = createElement('p', 'Steps');
        let h1Steps = createElement('h1', numberWithCommas(screen2Data.totalDaySteps))

        icon.appendChild(iconElement);
        innerCircle.appendChild(icon);
        innerCircle.appendChild(stepsText);
        innerCircle.appendChild(h1Steps)
        circle.appendChild(innerCircle);
        return circle;
    }

    function motivational() {
        let motivational = createElement('div', '', 'motivational');
        let veryGood = createElement('p', 'Very good')
        let keepGoing = createElement('h1', 'Keep going!')
        motivational.appendChild(veryGood);
        motivational.appendChild(keepGoing);
        return motivational;
    }


    function bottomData(km, cal, hours) {
        let bottomDataDiv = createElement('div', '', 'bottomData');

        function dailyData(headName, dataValue, divClassName) {

            let div = createElement('div', '', divClassName);
            let Head = createElement('p', headName)
            let Data = createElement('h1', dataValue);
            div.appendChild(Head);
            div.appendChild(Data);
            return div;
        }

        bottomDataDiv.appendChild(dailyData('km', km, 'bottomData__kilometers'));
        bottomDataDiv.appendChild(dailyData('cal', cal, 'bottomData__callories'));
        bottomDataDiv.appendChild(dailyData('hours', hours, 'bottomData__hours'));
        return bottomDataDiv;
    }

    wrapperDiv.appendChild(circle());
    wrapperDiv.appendChild(motivational())
    wrapperDiv.appendChild(bottomData(calculateDistance(screen2Data.totalDaySteps), calculateCalories(screen2Data.totalDaySteps), calculateActivity(screen2Data.totalDaySteps, true)))
    document.getElementById('content').appendChild(wrapperDiv);
}


window.addEventListener("load", function () {

    document.getElementById('content').appendChild(loader())//spinner
    fetchData();
});
