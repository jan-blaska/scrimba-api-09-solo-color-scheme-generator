const colorFormEl = document.getElementById('color-form')
const colorsGrid = document.getElementById('colors-grid')

function getColorScheme(seedColor, mode) {
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${mode}&count=5`, {
    method: "GET"
    })
        .then(res => res.json())
        .then(data => renderColors(data.colors))
}

function renderColors(colors) { 
    colorsGrid.innerHTML = `
        <div class="rectangle" style="background-color:${colors[0].hex.value}"></div>
        <div class="rectangle" style="background-color:${colors[1].hex.value}"></div>
        <div class="rectangle" style="background-color:${colors[2].hex.value}"></div>
        <div class="rectangle" style="background-color:${colors[3].hex.value}"></div>
        <div class="rectangle" style="background-color:${colors[4].hex.value}"></div>
        <p class="text-hex">${colors[0].hex.value}</p>
        <p class="text-hex">${colors[1].hex.value}</p>
        <p class="text-hex">${colors[2].hex.value}</p>
        <p class="text-hex">${colors[3].hex.value}</p>
        <p class="text-hex">${colors[4].hex.value}</p>
    `
    document.body.style.background = `linear-gradient(to right, ${colors[0].hex.value},${colors[1].hex.value},${colors[2].hex.value},${colors[3].hex.value},${colors[4].hex.value})`
}



colorFormEl.addEventListener("submit", (e) => {
    e.preventDefault()
    const seedColor = document.getElementById('color-picker').value.substring(1)
    const mode = document.querySelector('#color-select option:checked').value
    getColorScheme(seedColor, mode)
})

/* initial values when user enters the page */
getColorScheme("e66465", "monochrome");