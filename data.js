const people = [
    { name: "Mohamed Karam", age: 24, city: "Giza" },
    { name: "Ahmed Hassan", age: 22, city: "Cairo" },
    { name: "Sara Ali", age: 21, city: "Alexandria" },
    { name: "Omar Adel", age: 28, city: "Riyadh" },
    { name: "Nour Mahmoud", age: 20, city: "Giza" },
    { name: "Mona Samir", age: 26, city: "Cairo" },
    { name: "Karim Tarek", age: 35, city: "Jeddah" },
    { name: "Huda Mostafa", age: 19, city: "Riyadh" }
];
const searchInput = document.getElementById("search");
const tableBody = document.getElementById("people-body");
const tableStatus = document.getElementById("table-status");
const nameButton = document.getElementById("sort-name");
const ageButton = document.getElementById("sort-age");
let sortKey = "";
let sortDirection = 1;

function renderTable() {
    const term = searchInput.value.trim().toLowerCase();
    const visiblePeople = people.filter(function (person) {
        return person.name.toLowerCase().includes(term) ||
            String(person.age).includes(term) ||
            person.city.toLowerCase().includes(term);
    });
    if (sortKey !== "") {
        visiblePeople.sort(function (a, b) {
            if (sortKey === "age") {
                return (a.age - b.age) * sortDirection;
            }
            return a.name.localeCompare(b.name, "en", { sensitivity: "base" }) *
                sortDirection;
        });
    }
    tableBody.replaceChildren();
    visiblePeople.forEach(function (person) {
        const row = document.createElement("tr");
        ["name", "age", "city"].forEach(function (key) {
            const cell = document.createElement("td");
            cell.textContent = String(person[key]);
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });
    if (visiblePeople.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 3;
        cell.textContent = "No matching people found.";
        row.appendChild(cell);
        tableBody.appendChild(row);
    }
    document.getElementById("name-heading").removeAttribute("aria-sort");
    document.getElementById("age-heading").removeAttribute("aria-sort");
    if (sortKey !== "") {
        document.getElementById(sortKey + "-heading").setAttribute(
            "aria-sort", sortDirection === 1 ? "ascending" : "descending"
        );
    }
    nameButton.setAttribute("aria-pressed", String(sortKey === "name"));
    ageButton.setAttribute("aria-pressed", String(sortKey === "age"));
    let sortMessage = "";
    if (sortKey === "name") {
        sortMessage = " Sorted by name (" + (sortDirection === 1 ? "A-Z" : "Z-A") + ").";
    } else if (sortKey === "age") {
        sortMessage = " Sorted by age (" +
            (sortDirection === 1 ? "youngest first" : "oldest first") + ").";
    }
    tableStatus.textContent = visiblePeople.length + " of " + people.length +
        " people." + sortMessage;
}

function changeSort(key) {
    if (sortKey === key) {
        sortDirection *= -1;
    } else {
        sortKey = key;
        sortDirection = 1;
    }
    renderTable();
}
searchInput.addEventListener("input", renderTable);
nameButton.addEventListener("click", function () { changeSort("name"); });
ageButton.addEventListener("click", function () { changeSort("age"); });
renderTable();
searchInput.disabled = false;
nameButton.disabled = false;
ageButton.disabled = false;
