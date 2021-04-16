var canvas = document.getElementById("my-canvas");
var context = canvas.getContext("2d");
canvas.width = window.innerWidth-100;
canvas.height = window.innerHeight-70;
context.strokeStyle = "black"
context.lineWidth = "10px"; 
context.beginPath();
context.rect(0, 0, canvas.width, canvas.height);
context.fillStyle = "white";
context.fill();

//function to draw
function draw(counter){
    //event activated when mouse down
    $("#my-canvas").mousedown(function(e){
        //start path
        context.beginPath();
        //mouse is moving, draw
        $("#my-canvas").mousemove(function(e){
            //use lineTo to traverse the coordinates
            let rect = canvas.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            context.lineTo(x,y);
            if(counter == 'eraser')
            {
                context.strokeStyle ='white';
            }
            //finally use context.stroke to make path visible
            context.stroke();

        })
            
    })


    
    //event deactivated when mouse released
        $("#my-canvas").mouseup(function(e){
            $("#my-canvas").off("mousemove");
            counter = 'true';
        })
    
}

//function to download
function Download(a, canvas, name) {
    a.download = name
    a.href = canvas.toDataURL()
}

//function to change the colour of the pen
function change_colour(colour){
    context.strokeStyle = colour.value;
}

//function to change the size of the brush
function change_size(size){
    context.lineWidth = size.value;
}


//uploading a file and setting it as background
const reader = new FileReader();
const image = new Image();
 
const uploadImage = (e) => {
    reader.onload = () => {
        image.onload = () => {
            //setting the image as background
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
        image.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
};
const imageLoader = document.getElementById("upload");
imageLoader.addEventListener("change", uploadImage);


