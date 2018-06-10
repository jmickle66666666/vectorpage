image_width = 5;
image_height = 10;

names = ["r", "g", "b", "a"];

function createVectorField() {
    var container = document.createElement("div");
    container.id = "container";
    
    for (i = 0; i < 4; i++) {
        var el = document.createElement("input");
        el.name = names[i];
        el.type = "number";
        el.style.width = "45px";
        el.value = Math.random();
        container.appendChild(el);
    }

    return container;
}

function populateTable(table, rows, cells) {
    if (!table) table = document.createElement('table');
    for (var i = 0; i < rows; ++i) {
        var row = document.createElement('tr');
        for (var j = 0; j < cells; ++j) {
            row.appendChild(document.createElement('td'));
            row.cells[j].appendChild(createVectorField());
        }
        table.appendChild(row);
    }
    return table;
}

main_table = null;

function buildTable() {
    image_width = document.getElementById("inputWidth").value;
    image_height = document.getElementById("inputHeight").value;
    if (main_table != null) {
        old_table = main_table;
        document.body.removeChild(main_table);
    }
    main_table = populateTable(null, image_height, image_width);

    for (var i = 0; i < image_width; i++) {
        for (var j = 0; j < image_height; j++) {
            try {
                cell = old_table.rows[j].cells[i];
                newCell = main_table.rows[j].cells[i];

                node = cell.firstChild.firstChild;
                newNode = newCell.firstChild.firstChild;
                newNode.value = node.value;

                node = node.nextSibling;
                newNode = newNode.nextSibling;
                newNode.value = node.value;

                node = node.nextSibling;
                newNode = newNode.nextSibling;
                newNode.value = node.value;
                
                node = node.nextSibling;
                newNode = newNode.nextSibling;
                newNode.value = node.value;
            } catch {

            }
        }
    }

    document.body.appendChild(main_table);
} 

buildTable();
//main_table = populateTable(null, image_height, image_width);

function makeImage() {
    canvas = document.createElement("canvas");
    canvas.width = image_width;
    canvas.height = image_height;
    ctx = canvas.getContext('2d');
    imgdat = ctx.createImageData(image_width, image_height);
    pixelArray = imgdat.data;
    for (var i = 0; i < image_width; i++) {
        for (var j = 0; j < image_height; j++) {
            cell = main_table.rows[j].cells[i];
            node = cell.firstChild.firstChild;
            var r = node.value;
            node = node.nextSibling;
            var g = node.value;
            node = node.nextSibling;
            var b = node.value;
            node = node.nextSibling;
            var a = node.value;
            pixelArray [ (((j * image_width) + i) * 4) + 0 ] = r * 255;
            pixelArray [ (((j * image_width) + i) * 4) + 1 ] = g * 255;
            pixelArray [ (((j * image_width) + i) * 4) + 2 ] = b * 255;
            pixelArray [ (((j * image_width) + i) * 4) + 3 ] = a * 255;
        }
    }
    ctx.putImageData(imgdat,0,0);
    document.body.appendChild(canvas);
}