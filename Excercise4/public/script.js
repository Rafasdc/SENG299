
/**
 * Requests a new board state from the server's /data route.
 *
 * @param cb {function} callback to call when the request comes back from the server.
 */
function getData(cb){
    $.get("/data", function(data, textStatus, xhr){
        console.log("Response for /data: "+textStatus);

        // handle any errors here....

        // draw the board....
        cb(data);

    });
}

/**
 * Draws the board to the #canvas element on the page.
 *
 * You may find the following links helpful:
 *  - https://api.jquery.com/
 *  - https://api.jquery.com/append/
 *  - http://www.tutorialspoint.com/jquery/
 *  - http://www.w3schools.com/jquery/
 *
 * @param state {object} - an object representing the state of the board.
 */
function drawBoard(state){

    var canvas = $("#canvas");

    // Change the height and width of the board here...
    // everything else should adapt to an adjustable
    // height and width.
    var W = 600, H = 600;
    canvas.css("height", H);
    canvas.css("width", W);

    // The actual SVG element to add to.
    // we make a jQuery object out of this, so that
    // we can manipulate it via calls to the jQuery API.
    var svg = $(makeSVG(W, H));

    var size = state.size;
    var width = Math.floor((W-20)/state.size);
    var height = Math.floor((H-20)/state.size);
    var posx = 20;
    var posy = 20;

    svg.append(makeRectangle(20,20,(width*size)-width,(height*size)-height,"burlywood"));
    for (var i =0; i < state.size; i++){
        if (i != 0){
        posy += height;
        }
        posx = 20;
        svg.append(makeLine(posx,posy,(width*(size-1))+20,posy,"black",2));
        for (var j =0; j < state.size; j++){
            if (j != 0){
              posx+= width;
            }
            svg.append(makeLine(posx,posy,posx,(height*size)-height,"black",2));
            if (state.board[i][j] == 1){
                svg.append(makeCircle(posx,posy,10,"black"));
                if (j==size-1 ){
                  console.log(posx);
                }
            } else if (state.board[i][j] == 2){
                svg.append(makeCircle(posx,posy,10,"white"));
            }
        }
    }
    //svg.append(makeLine(10,H-10,W-10,H-10,"black",2));
    //svg.append(makeLine(W-20,20,W-20,H-20,"black",2));
    //  You will want to append elements to the
    //  svg variable using the svg.append(....)
    //  method.


    // append the svg object to the canvas object.
    canvas.append(svg);

}

function init(){

    // do page load things here...

    console.log("Initalizing Page....");
    getData(drawBoard);
}
