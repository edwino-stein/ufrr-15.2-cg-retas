App.define('Controller.Main', {

    grid: 'View.Grid',
    canvas: 'View.Canvas',

    algorithm: null,
    gridColor: 'black',
    canvasColor: 'gray',

    canvasToGridX: function(x){
        return Math.floor((this.grid.pixelsWidth * x)/this.canvas.getViewBoxWidth());
    },

    canvasToGridY: function(y){
        return Math.floor((this.grid.pixelsHeight * y)/this.canvas.getViewBoxHeight());
    },

    render: function(point1, point2){
        if(this.algorithm === null) return;
        console.log('render');
    },

    updateLine: function(point1, point2){
        this.canvas.setPoint1(point1);
        this.canvas.setPoint2(point2);
        this.canvas.setColor(this.canvasColor);

        this.render(point1, point2);
    },

    setColor: function(color){

        switch(color){
            case 'blue':
                this.gridColor = 'blue';
                this.canvasColor = 'yellow';
            break;

            case 'red':
                this.gridColor = 'red';
                this.canvasColor = 'cyan';
            break;

            case 'green':
                this.gridColor = 'green';
                this.canvasColor = 'magenta';
            break;

            case 'yellow':
                this.gridColor = 'yellow';
                this.canvasColor = 'blue';
            break;

            case 'black':
            default:
                this.gridColor = 'black';
                this.canvasColor = 'gray';
            break;
        }

    },

    ready: function(){
        this.grid.raster(10);
    },

    init: function(){
        var me = this;
        me.grid = me._appRoot_.get(me.grid);
        me.canvas = me._appRoot_.get(me.canvas);
    }

});
