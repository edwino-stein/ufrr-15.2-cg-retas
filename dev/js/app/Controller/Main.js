App.define('Controller.Main', {

    grid: 'View.Grid',
    canvas: 'View.Canvas',

    getX1: function(){

        var $input = $('#x1');
            x = parseInt($input.val());

        if(isNaN(x) || x <= 0){
            $input.val(0);
            x = 0;
        }
        else if(x >= this.canvas.getViewBoxWidth()){
            x = this.canvas.getViewBoxWidth()
            $input.val(x);
        }

        return x;
    },

    getX2: function(){

        var $input = $('#x2');
            x = parseInt($input.val());

        if(isNaN(x) || x <= 0){
            $input.val(0);
            x = 0;
        }
        else if(x >= this.canvas.getViewBoxWidth()){
            x = this.canvas.getViewBoxWidth()
            $input.val(x);
        }

        return x;
    },

    getY1: function(){

        var $input = $('#y1');
            y = parseInt($input.val());

        if(isNaN(y) || y <= 0){
            $input.val(0);
            y = 0;
        }
        else if(y >= this.canvas.getViewBoxWidth()){
            y = this.canvas.getViewBoxHeight()
            $input.val(x);
        }

        return y;
    },

    getY2: function(){

        var $input = $('#y2');
            y = parseInt($input.val());

        if(isNaN(y) || y <= 0){
            $input.val(0);
            y = 0;
        }
        else if(y >= this.canvas.getViewBoxWidth()){
            y = this.canvas.getViewBoxHeight()
            $input.val(x);
        }

        return y;
    },

    canvasToGridX: function(x){
        return Math.floor((this.grid.pixelsWidth * x)/this.canvas.getViewBoxWidth());
    },

    canvasToGridY: function(y){
        return Math.floor((this.grid.pixelsHeight * y)/this.canvas.getViewBoxHeight());
    },


    change: function(e){

        var x1 = this.getX1(),
            y1 = this.getY1(),
            x2 = this.getX2(),
            y2 = this.getY2();

        this.canvas.setX1(x1);
        this.canvas.setY1(y1);
        this.canvas.setX2(x2);
        this.canvas.setY2(y2);

        this.grid.deactivateAllPixels();
        this.teste(x1, y1, x2, y2);
    },


    ready: function(){
        this.grid.raster(10);
        this.canvas.updatePosition();
    },

    init: function(){
        var me = this;

        me.grid = me._appRoot_.get(me.grid);
        me.canvas = me._appRoot_.get(me.canvas);

        $('.point-position').change(function(e){me.change(e);})
                            .on('input', function(e){me.change(e);});
    }

});