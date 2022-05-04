export class Calendar {
    rootElem;
    variant;
    dateChanged;
    day;
    month;
    year;
    monthNamesLong;
    dayNamesShort;
    approvedDays;
    awaitingApprovalDays;

    constructor(rootElem, variant) {
        this.rootElem = document.querySelector(`#${rootElem}`);
        this.variant = variant;

        this.monthNamesLong = [...Array(12).keys()].map(m => new Date(2000, m, 1).toLocaleString("default", { month: "long" }));

        this.dayNamesShort = [...Array(7).keys()].map(d => new Date(2000, 1, d).toLocaleString("default", { weekday: "short" }).slice(0, 2));
    }

    setDayStates(approved, awaitingApproval) {
        this.approvedDays = approved;
        this.awaitingApprovalDays = awaitingApproval;
        this.populateDays();
    }

    init(dateChanged) {

        this.dateChanged = dateChanged;

        this.reset();
    }

    reset() {
        const now = new Date();
        this.day = now.getDate();
        this.month = now.getMonth();
        this.year = now.getFullYear();

        this.populateHeader();
        this.populateMonthYear();
    }

    populateMonthYear() {
        this.populateDays();
        if (this.dateChanged) {
            this.dateChanged(this.year, this.month, this.day, this.monthNamesLong);
        }
    }

    populateHeader() {
        const headerElem = this.rootElem.querySelector(".calendar-header");
        headerElem.innerHTML = "";
        for (let i = 0; i < 7; i++) {
            const headerItemElem = document.createElement("div");
            headerItemElem.classList.add("calendar-cell");
            headerItemElem.classList.add(`calendar-cell-${this.variant}`);
            headerItemElem.innerText = this.dayNamesShort[i];
            headerElem.appendChild(headerItemElem);
        }
    }

    populateDays() {
        const firstDayOfMonth = new Date(this.year, this.month, 1);

        // months are 0 based, but days are 1 based, so 0 is the last day of the previous month
        const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
        const daysInLastMonth = new Date(this.year, this.month, 0).getDate();

        let firstDayOfWeek = firstDayOfMonth.getDay() - 1;

        const days = [];
        const daysState = [];
        const todayFull = new Date();
        const today = (new Date(todayFull.getFullYear(), todayFull.getMonth(), todayFull.getDate())).getTime();

        if (firstDayOfWeek < 0) {
            firstDayOfWeek += 7;
        }

        // First fill in the days from the end of last month to the start day of this month
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            days.push(daysInLastMonth - i);
            daysState.push(0);
        }
        // Now the days for this month
        for (let i = 0; i < daysInMonth; i++) {
            days.push(i + 1);

            const fullFormattedDate = this.year + "-" + (this.month + 1).toString().padStart(2, '0') + "-" + (i + 1).toString().padStart(2, '0')

            if (this.approvedDays && this.approvedDays.includes(fullFormattedDate)) {
                const d = new Date(this.year, this.month, i);

                daysState.push(d.getTime() < today ? 2 : 3);
            } else if (this.awaitingApprovalDays && this.awaitingApprovalDays.includes(fullFormattedDate)) {
                daysState.push(4);
            } else {
                daysState.push(1);
            }
        }
        // Any remaining to make a whole week
        const remaining = 7 - (days.length % 7);
        if (remaining < 7) {
            for (let i = 0; i < remaining; i++) {
                days.push(i + 1);
                daysState.push(0);
            }
        }

        const daysElem = this.rootElem.querySelector(".calendar-days");
        daysElem.innerHTML = "";
        let lastDayStateText;
        for (let i = 0; i < days.length; i++) {
            const dayItemElem = document.createElement("div");
            dayItemElem.classList.add("calendar-cell");
            dayItemElem.classList.add(`calendar-cell-${this.variant}`);
            dayItemElem.classList.add("calendar-cell-border");
            let dayStateText;
            if (daysState[i] === 0) {
                dayItemElem.classList.add("calendar-cell-dimmed");
            } else if (daysState[i] === 2) {
                dayItemElem.classList.add("calendar-cell-used");
                dayStateText = "Annual Leave";
            } else if (daysState[i] === 3) {
                dayItemElem.classList.add("calendar-cell-approved");
                dayStateText = "Annual Leave";
            } else if (daysState[i] === 4) {
                dayItemElem.classList.add("calendar-cell-awaiting-approval");
                dayStateText = "Awaiting Approval";
            }

            dayItemElem.classList.add("col");
            dayItemElem.classList.add("fill");

            const dayTextElem = document.createElement("div");
            dayTextElem.classList.add("calendar-cell-day-text");
            dayTextElem.innerText = days[i];
            if (todayFull.getFullYear() == this.year && todayFull.getMonth() === this.month && days[i] === this.day && daysState[i] !== 0) {
                dayTextElem.classList.add("calendar-cell-today");
            }

            dayItemElem.appendChild(dayTextElem);

            if (this.variant === "large") {
                if (dayStateText) {
                    const dayStateTextElem = document.createElement("div");
                    dayStateTextElem.classList.add("calendar-cell-day-state-text");
                    dayStateTextElem.innerHTML = lastDayStateText !== dayStateText ? dayStateText : "&nbsp;";
                    dayItemElem.appendChild(dayStateTextElem);

                    const dayStateBarContainerElem = document.createElement("div");
                    dayStateBarContainerElem.classList.add("calendar-cell-day-state-bar-container");
                    if (lastDayStateText !== dayStateText) {
                        dayStateBarContainerElem.classList.add("calendar-cell-day-state-bar-container-first");
                    }

                    const dayStateBarElem = document.createElement("div");
                    dayStateBarElem.classList.add("calendar-cell-day-state-bar");
                    dayStateBarContainerElem.appendChild(dayStateBarElem);

                    dayItemElem.appendChild(dayStateBarContainerElem);
                }
            }

            daysElem.appendChild(dayItemElem);
            lastDayStateText = dayStateText;
        }
    }

    monthIncrement(inc) {
        this.month += inc;
        if (this.month < 0) {
            this.month = 11;
            this.year--;
        } else if (this.month > 11) {
            this.month = 0;
            this.year++;
        }
        this.populateMonthYear();
    }
}