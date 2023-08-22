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
    const colorsHexValuesArray = colors.map(color => color.hex.value)
    colorsGrid.innerHTML = (colorsHexValuesArray.map((color) => {
        return (`
            <div class="color-box">
                <div class="rectangle" data-getcolor=${color} style="background-color:${color}"></div>
                <p class="text-hex" data-getcolor=${color}>${color}</p>
            </div>
        `)
    })).join('')
    document.body.style.background = `linear-gradient(to right, ${colorsHexValuesArray})`
}

/* copy the color as a text to clipboard */
document.addEventListener('click', function(e) {
    if (e.target.dataset.getcolor) {
        navigator.clipboard.writeText(e.target.dataset.getcolor);
    }
})

colorFormEl.addEventListener("submit", (e) => {
    e.preventDefault()
    const seedColor = document.getElementById('color-picker').value.substring(1)
    const mode = document.querySelector('#color-select option:checked').value
    getColorScheme(seedColor, mode)
})

/* initial values when user enters the page */
getColorScheme("e66465", "monochrome");