function adminLayouts() {
    return {
        lg: [
            { i: "services", x: 0, y: 0, w: 5, h: 10, minW: 3.5, minH: 10 },
            { i: "tickets", x: 5, y: 0, w: 7, h: 10, minH: 7, minW: 2 },
            { i: "users", x: 0, y: 1, w: 12, h: 10, minH: 10 },
        ],
    }
}

function customerLayouts(){
    return {
        lg: [
            { i: "services", x: 0, y: 0, w: 5, h: 10, minW: 3.5, minH: 10 },
            { i: "tickets", x: 5, y: 0, w: 7, h: 10, minH: 7, minW: 2 },
            { i: "users", x: 0, y: 1, w: 12, h: 10, minH: 10 },
        ],
    }
}

function employeeLayouts(){
    return {
        lg: [
            { i: "services", x: 0, y: 0, w: 5, h: 10, minW: 3.5, minH: 10 },
            { i: "tickets", x: 5, y: 0, w: 7, h: 10, minH: 7, minW: 2 },
            { i: "users", x: 0, y: 1, w: 12, h: 10, minH: 10 },
        ],
    }
}

export default {adminLayouts, customerLayouts, employeeLayouts}